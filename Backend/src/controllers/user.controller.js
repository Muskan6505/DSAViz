import {asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import{ deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"; 


const registerUser = asyncHandler(async(req, res) => {

    const {fullname, email, username, password} = req.body
    
    if(
        [fullname, email, username, password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    let avatarLocalPath;

    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
        avatarLocalPath= req.files.avatar[0].path;
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const createdUser = await User.create({
        fullname,
        avatar: avatar?.url || "",
        email,
        password,
        username:username.toLowerCase(),
    })

    const user = await User.findById(createdUser._id).select(
        "-password -refreshToken"
    )
    if(!user){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure:true
    };

    return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(201)
    .json(
        new ApiResponse(
            200, 
            user, 
            "User registered successfully"
        )
    )
})

const generateAccessAndRefreshToken = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    }catch(error){
        throw new ApiError(500, "Somethong went wrong while generating refresh and access token")
    }
}

const loginUser = asyncHandler(async(req, res) => {

    const {email, username, password} = req.body

    if(!(username || email)){
        throw new ApiError(400, "username or email is required");    
    }

    const user = await User.findOne({
        $or:[{ username }, { email }]
    })

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            user,
            "User Logged in Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged Out successfully"
        )
    )
})

const refreshAccessToken = asyncHandler(async(req, res) => {

    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
        if(!incomingRefreshToken){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user =await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        };
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                user,
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh Token"
        )
    }
})

const changeCurrentPassword = asyncHandler(async(req, res) =>{
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old Password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "Current user fetched Successfully"
        )
    )
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullname, email} = req.body
    if(!fullname || !email){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id, 
        {
            $set:{
                fullname: fullname,
                email:email
            }
        },
        {new: true}
    ).select(" -password ")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Account details updated successfully"
        )
    )
})

const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.files?.avatar[0].path

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    let user = await User.findById(req.user._id)

    const oldFilePath = user.avatar
    user = await User.findByIdAndUpdate(
        user?._id,
        {
            $set:{
                avatar:avatar?.url || ""
            }
        },
        {
            new:true
        }
    ).select("-password")

    await deleteFromCloudinary(oldFilePath)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Avatar updated successfully"
        )
    )
})

export{
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar
}