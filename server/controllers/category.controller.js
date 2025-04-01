import Category from "../models/category.model.js";


/**
 * Create a new category (Admin only)
 */
export const createCategory = async (req, res) => {
  try {
    const {userId, role} = req.user;
    if(role !== "admin"){
      return res.status(403).json({ message:"Access denied. Admins only."});
    }

    const {name, description} = req.body;

    // Check if category name already exists
    const existingCategory = await Category.findOne({name});
    if(existingCategory){
      return res.status(400).json({message:"Category already exists"});
    }

    // Create new category
    const category = new Category({name, description, createdBy: userId});
    await category.save();

    res.status(201).json({ message: "Category created successfully.", category });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Internal server error." });
  }
}

/**
 * Update a category (Admin only)
 */
export const updateCategory = async (req, res) => {
  try {
    const { role} = req.user;
    if(role !== "admin"){
      return res.status(403).json({ message:"Access denied. Admins only."});
    }

    const { id } = req.params;
    const { name, description } = req.body;
    
    const category = await Category.findById(id);
    if(!category){
      return res.status(404).json({message:"Category not found"});
    }

    // Check if category name already exists
    const existingCategory = await Category.findOne({name});
    if(existingCategory && existingCategory._id.toString() !== id){
      return res.status(400).json({message:"Category already exists"});
    }

    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();

    return res.status(200).json({ message: "Category updated successfully.", category });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: error.message});
  }
}

/**
 * Delete a category (Admin only)
 */
export const deleteCategory = async (req, res) => {
  try {
    const {role} = req.user;
    if(role !== "admin"){
      return res.status(403).json({ message:"Access denied. Admins only."});
    }
    const { id } = req.params;
    const category = await Category.findById(id);
    if(!category){
      return res.status(404).json({message:"Category not found"});
    }

    await Category.deleteOne({_id: id});

    return res.status(200).json({ message: "Category deleted successfully." });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error." , error: error.message});
  }  
}



/**
 * Get all categories (Accessible by all logged-in users)
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

/**
 * Get category by ID (Accessible by all logged-in users)
 */
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("createdBy", "username");

    if(!category){
      return res.status(404).json({message:"Category not found"});
    }

    res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: error.message});
  }
}