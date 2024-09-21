
const User= require("../User/userSchema")
const { generateToken } = require("../utils/loger")
// register
exports.register=async(req,res)=>{
    const {name,email,password}=req.body
  //   console.log(req.body);
    if(!email&&!password)
       return res.status(400).json({message:"email or password not  valid"})
   try {
        const user= new User ({
           name: name,
           email:email,
           password: password
        })
         await user.save()
         console.log(user);
        
         res.send("user is registered")
   } catch (error) {
     res.status(400).json({error:error.message});
   }
}
//  login


exports.login=async(req,res)=>{
    const {email,password}= req.body
    try {
       const user = await User.findOne({ email });
       console.log(user);
       if(!user)
       res.status(400).json({error:error.message});
       const isMatch = await user.comparePassword(password);
 
       if (!isMatch) return res.status(400).send('Invalid credentials');
       const token=   generateToken(user._id, process.env.SecretKey); 
       console.log(token);
       
       res.send({token})
    } catch (error) {
       res.status(400).json({ error: error.message });
    }
 }