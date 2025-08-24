const { addWLItemDB, getWLItemsDB, deleteWLItemDB, deleteAllWLItemsDB } = require("../../services/users/wishlist.services");


const getWLItems = async(req, res) => {

    try {
        //  console.log(">>> user.id:", req.user?.id);
        const data = await getWLItemsDB(req.user.id);
        return res.json({success:true, data});
    } catch (error) {
        return res.json({success:false, error:"something went wrong!"});
    }
};
 const addWLItem = async(req, res) => {
    if(!req.body.item){
        return res.json({success:false, error:"All fields are required"});
    }
    try {
        //  console.log(">>> user.id:", req.user.id);
    console.log(">>> body.item:", req.body.item);
        const  data = await addWLItemDB(req.user.id, req.body.item);
          return res.json({ success: true, data });
    } catch (error) {
        // console.error("Error in addWLItem:", error);

        return res.json({success:false, error:"something went wrong!"})
        
    }
 };

 const deleteWLItem = async (req, res) => {
    const { id } = req.params;
    try {
         await deleteWLItemDB(id, req.user.id);
    return res.json({ success: true, data: "Wishlist item deleted successfully!" });
    } catch (error) {
     return res.json({ success: false, error: "something went wrong!" });   
    }
 };

 const deleteAllWLItems = async(req, res) => {
    try {
        await deleteAllWLItemsDB(req.user.id);
        return res.json({success:true, data:"All wishlist items deleted successfully!"})
    } catch (error) {
        return res.json({success:false, error:"something went wrong!"});
    }
 };

 module.exports = { getWLItems, addWLItem, deleteWLItem, deleteAllWLItems };