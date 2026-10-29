import { User } from "../models/userModel.js";

export const handleUserRegister = async(req, res) => {
    try {
        const userData = req.body;
        if(!userData){
            return res.status(401).json({message: "Data not found"});
        }
        await User.create(userData);
        return res.status(200).json(userData);
    } catch (error) {
        console.error("Error from Register Route :" ,error);
    }
}