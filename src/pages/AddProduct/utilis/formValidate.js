export const validate = (formData, setErrors) => {
  const newErrors = {};
  if (!formData.title.trim()) {
    newErrors.title = "Title is required";
  }
  if (!formData.brand.trim()) {
    newErrors.brand = "Brand is required";
  }
  if (!formData.category.trim()) {
    newErrors.category = "Category is required";
  }
  if (!formData.description.trim()) {
    newErrors.description = "Description is required";
  }
  if (!formData.images) {
    newErrors.images = "Image is required";
  }
  if (!formData.price || formData.price <= 0) {
    newErrors.price = "Price must be greater than 0";
  }
  if (!formData.stock || formData.stock <= 0) {
    newErrors.stock = "Stock must be greater than 0";
  }
  if (!formData.rating || formData.rating <= 0) {
    newErrors.rating = "Rating must be greater than 0";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
