const Service = require("../models/Service.Model");
const Category = require("../models/Category.Model");
const cloudinary = require("../cloudinary");

// Create Service - Adds a new service
const createService = async (req, res) => {
  try {
    let {
      name_en, name_ar, name_fr,
      description_en, description_ar, description_fr,
      category,
      service_points
    } = req.body;

    service_points = JSON.parse(service_points);

    // ✅ Upload each image to Cloudinary
    const cloudinaryUpload = async (file) => {
      return await cloudinary.uploader.upload(file.path, {
        folder: "services", // optional folder in your Cloudinary account
      });
    };


    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinaryUpload(file);
        return { url: result.secure_url };
      })
    );

    // ✅ Save to MongoDB
    const newService = await Service.create({
      name: {
        en: name_en,
        ar: name_ar,
        fr: name_fr,
      },
      description: {
        en: description_en,
        ar: description_ar,
        fr: description_fr,
      },
      service_points: service_points.map((point) => ({
        title: {
          en: point.title.en,
          ar: point.title.ar,
          fr: point.title.fr,
        },
        content: {
          en: point.content.en,
          ar: point.content.ar,
          fr: point.content.fr,
        },
      })),
      category,
      images: uploadedImages, // flat array of image objects with secure_url
    });

    res.status(200).json({
      message: "Service created successfully",
      data: newService,
      success: true,
    });
  } catch (error) {
    console.error("❌ Error creating service:", error);
    res.status(500).json({ message: "Error creating service", success: false });
  }
};

// Get All Services
const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("category");
    if (services.length === 0) {
      return res
        .status(200)
        .json({ message: "No services found", success: true });
    }
    return res.json({
      data: services,
      success: true,
      message: "Services retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching services", success: false });
  }
};

// Get Service by ID
const getService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById({ _id: id });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.json({
      data: service,
      success: true,
      message: "Service retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching service", success: false });
  }
};

// Get Service By Category
const getServiceByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const service = await Service.find({ category }).populate("category");
    if (!service) {
      return res
        .status(200)
        .json({ message: "No service found", success: true });
    }
    return res.json({
      data: service,
      success: true,
      message: "Service retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching service", success: false });
  }
};

// Update Service by ID
const updateService = async (req, res) => {
  try {
    // console.log("Update Service ==>", req.body);
    // console.log("Update Service ==>", req.files);
    const { id } = req.params;
    let {
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      category,
      service_points,
    } = req.body;

    service_points = JSON.parse(service_points);

    const service = await Service.findById({ _id: id });

    // ✅ Upload each image to Cloudinary
    const cloudinaryUpload = async (file) => {
      return await cloudinary.uploader.upload(file.path, {
        folder: "services", // optional folder in your Cloudinary account
      });
    };

    const uploadedImages = await Promise.all(
      req.files?.map(async (file) => {
        const result = await cloudinaryUpload(file);
        return { url: result.secure_url };
      })
    );

    // Update the Service document
    const updatedService = await Service.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: {
            en: name_en,
            ar: name_ar,
            fr: name_fr,
          },
          description: {
            en: description_en,
            ar: description_ar,
            fr: description_fr,
          },
          service_points: service_points.map((point) => ({
            title: {
              en: point.title.en,
              ar: point.title.ar,
              fr: point.title.fr,
            },
            content: {
              ar: point.content.ar,
              fr: point.content.fr,
            },
          })),
          category,
          images: req.files.length > 0 ? uploadedImages : service.images, // flat array of image objects with secure_url
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      return res
        .status(404)
        .json({ message: "Service not found", success: false });
    }

    return res.json({
      message: "Service updated successfully",
      data: updatedService,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating service", success: false });
  }
};

// Delete Service by ID
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete({ _id: id });

    if (!deletedService) {
      return res
        .status(404)
        .json({ message: "Service not found", success: false });
    }

    return res.json({ message: "Service deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error deleting service", success: false });
  }
};

module.exports = {
  createService,
  getServices,
  getService,
  getServiceByCategory,
  updateService,
  deleteService,
};
