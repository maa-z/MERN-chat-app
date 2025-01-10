import express from "express"
import { signup , login , logout ,checkAuth , updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/test",(req,res)=>{
    res.send("success");
})

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)


// not tested yet
router.put("/update-profile", protectRoute ,updateProfile);

// just to check which user is logged in , for frontend 
router.get("/check", protectRoute , checkAuth);

export default router;
