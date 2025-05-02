const Service = require("../models/Service.Model");
const cloudinary = require("../cloudinary");

// Create Service - Adds a new service
// const createService = async (req, res) => {
//   try {
//     const { name, description, service_points, category } = req.body;
//     console.log(req.body.service_points[0].images);

//     // Validate if name, description, and service points exist
//     if (!name || !description || !service_points|| !category) {
//       return res.status(400).json({ message: "All fields are required", success: false });
//     }

//     // Handle image uploads for each service point (for each feature)
//     const servicePointsWithImages = await Promise.all(
//       service_points.map(async (point) => {
//         const images = await Promise.all(
//           point.images.map(async (image) => {
//             // Upload each image to Cloudinary and get the URL
//             const uploadedImage = await cloudinary.uploader.upload(image.url); // Upload to Cloudinary
//             return { url: uploadedImage.secure_url }; // Get the secure URL
//           })
//         );

//         return {
//           title: {
//             en: point.title.en,
//             ar: point.title.ar,
//             fr: point.title.fr,
//           },
//           content: {
//             en: point.content.en,
//             ar: point.content.ar,
//             fr: point.content.fr,
//           },
//           images, // Store the uploaded image URLs
//         };
//       })
//     );

//     // Create the new Service document with all details
//     const newService = await Service.create({
//       name: {
//         en: name.en,
//         ar: name.ar,
//         fr: name.fr,
//       },
//       description: {
//         en: description.en,
//         ar: description.ar,
//         fr: description.fr,
//       },
//       service_points: servicePointsWithImages, // Attach service points with images
//       category,  // Reference to category (optional)
//     });

//     // Return success message and the newly created service
//     return res.status(201).json({
//       message: "Service created successfully",
//       data: newService,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Error creating service", success: false });
//   }
// };

const createService = async (req, res) => {
  try {
    const { name, description, service_points, category } = req.body;

    console.log(req.files, req.body);

  //   // Prepare image URLs from Cloudinary after upload
  //   const images = req.files.map((file) => {
  //     return {
  //       url: file.path,  // Cloudinary URL for each uploaded image
  //     };
  //   });

  //   // Create a new service with service points
  //   const newService = new Service({
  //     name,
  //     description,
  //     service_points: service_points.map((point, index) => ({
  //       ...point,
  //       images: images.slice(index * 2, (index + 1) * 2),  // Associate 2 images per service point
  //     })),
  //     category,
  //   });

  //   // Save the service to the database
  //   const savedService = await newService.save();
  //   res.status(200).json(savedService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Error creating service", success: false });
  }

};

// Get All Services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
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

// Update Service by ID
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, service_points } = req.body;

    if (!name || !description || !service_points) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Handle image uploads for each service point (if new images are provided)
    const updatedServicePoints = await Promise.all(
      service_points.map(async (point) => {
        const images = await Promise.all(
          point.images.map(async (image) => {
            const uploadedImage = await cloudinary.uploader.upload(
              req.file.path
            ); // Upload image to Cloudinary
            return { url: uploadedImage.secure_url }; // Get the secure URL
          })
        );
        return {
          title: {
            en: point.title.en,
            ar: point.title.ar,
            fr: point.title.fr,
          },
          description: {
            en: point.description.en,
            ar: point.description.ar,
            fr: point.description.fr,
          },
          images,
        };
      })
    );

    // Update the Service document
    const updatedService = await Service.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: { en: name.en, ar: name.ar, fr: name.fr },
          description: {
            en: description.en,
            ar: description.ar,
            fr: description.fr,
          },
          service_points: updatedServicePoints, // Updated service points with new images
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
      updatedService,
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
  updateService,
  deleteService,
};
