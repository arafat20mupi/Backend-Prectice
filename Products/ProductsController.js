// Must Important


const Products = require('../Products/ProductsSchema');

// প্রডাক্ট যোগ করার ফাংশন
exports.addProducts = async (req, res) => {
    try {
        // নতুন প্রডাক্ট তৈরি করুন এবং req.body থেকে ডেটা নিন
        const product = new Products(req.body);
        
        // প্রডাক্ট সংরক্ষণ করুন
        await product.save();
        
        // সফলভাবে সংরক্ষণ হলে প্রডাক্টের তথ্য সহ একটি সাফল্য বার্তা পাঠান
        res.status(201).json({
            message: "Product added successfully!",
            product: product,
        });
    } catch (error) {
        // ত্রুটির সময় একটি ত্রুটি বার্তা পাঠান
        res.status(400).json({ error: error.message });
    }
};

// প্রডাক্টের তালিকা আনার ফাংশন
exports.getProducts = async (req, res) => {
    try {
        // প্রডাক্টের তালিকা পেতে Mongoose কে কল করুন এবং সঠিকভাবে সাজান
        const products = await Products.find().sort({ createdAt: -1 });
        
        // সফলভাবে প্রডাক্টের তালিকা পাঠান
        res.status(200).json({ products: products });
    } catch (error) {
        // ত্রুটির সময় একটি ত্রুটি বার্তা পাঠান
        res.status(400).json({ error: error.message });
    }
};

// প্রডাক্ট আপডেট করার ফাংশন
exports.updateProducts = async (req, res) => {
    const { id } = req.params; // URL থেকে প্রডাক্টের ID নিন
    try {
        // প্রডাক্ট আপডেট করুন
        const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
            new: true, // নতুন ডেটা ফেরত দিন
            runValidators: true, // ভ্যালিডেশন চালান
        });
        
        // যদি প্রডাক্ট না পাওয়া যায়, তাহলে 404 রেসপন্স দিন
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // সফলভাবে আপডেট হলে প্রডাক্টের তথ্য পাঠান
        res.status(200).json({
            message: "Product updated successfully!",
            product: updatedProduct,
        });
    } catch (error) {
        // ত্রুটির সময় একটি ত্রুটি বার্তা পাঠান
        res.status(400).json({ error: error.message });
    }
};

// প্রডাক্ট মুছে ফেলার ফাংশন
exports.deleteProducts = async (req, res) => {
    const { id } = req.params; // URL থেকে প্রডাক্টের ID নিন
    try {
        // প্রডাক্ট মুছুন
        const deletedProduct = await Products.findByIdAndDelete(id);
        
        // যদি প্রডাক্ট না পাওয়া যায়, তাহলে 404 রেসপন্স দিন
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // সফলভাবে মুছে ফেলার পর বার্তা পাঠান
        res.status(200).json({
            message: "Product deleted successfully!",
            product: deletedProduct,
        });
    } catch (error) {
        // ত্রুটির সময় একটি ত্রুটি বার্তা পাঠান
        res.status(400).json({ error: error.message });
    }
};
