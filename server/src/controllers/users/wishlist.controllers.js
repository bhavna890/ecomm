const { addWLItemDB, getWLItemsDB, deleteWLItemDB, deleteAllWLItemsDB } = require("../../services/users/wishlist.services");


const getWLItems = async(req, res) => {
    try {
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
        const  data = await addWLItemDB(req.user.id, req.body.item);
          return res.json({ success: true, data });
    } catch (error) {
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