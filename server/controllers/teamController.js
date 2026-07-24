const Team = require("../models/Team");


// ==================================================
// 1. GET ALL PUBLISHED TEAM MEMBERS
// PUBLIC API
// GET /api/team
// ==================================================

const getPublishedTeam = async (
  req,
  res
) => {

  try {

    const team =
      await Team.find({

        isPublished: true,

      })
      .sort({

        displayOrder: 1,

        joinedAt: 1,

      });


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      count: team.length,

      data: team,

    });


  } catch (error) {

    console.error(
      "Get Published Team Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to get team members.",

    });

  }

};



// ==================================================
// 2. CREATE TEAM MEMBER
// ADMIN ONLY
// POST /api/team
// ==================================================

const createTeamMember = async (
  req,
  res
) => {

  try {

    const {

      name,

      role,

      shortBio,

      bio,

      profileImage,

      email,

      linkedin,

      github,

      website,

      department,

      isFeatured,

      isPublished,

      displayOrder,

      joinedAt,

    } = req.body;


    // ==================================================
    // CHECK REQUIRED FIELDS
    // ==================================================

    if (
      !name ||
      !role
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Name and role are required.",

      });

    }


    // ==================================================
    // CONVERT PUBLISHED STATUS
    // ==================================================

    const published =
      isPublished === true ||
      isPublished === "true";


    // ==================================================
    // CREATE TEAM MEMBER
    // ==================================================

    const teamMember =
      await Team.create({

        name:
          name.trim(),

        role:
          role.trim(),

        shortBio:
          shortBio || "",

        bio:
          bio || "",

        profileImage:
          profileImage || "",

        email:
          email || "",

        linkedin:
          linkedin || "",

        github:
          github || "",

        website:
          website || "",

        department:
          department ||
          "General",

        isFeatured:
          isFeatured === true ||
          isFeatured === "true",

        isPublished:
          published,

        displayOrder:
          Number(
            displayOrder
          ) || 0,

        joinedAt:
          joinedAt
            ? new Date(joinedAt)
            : null,

      });


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(201).json({

      success: true,

      message:
        "Team member created successfully.",

      data:
        teamMember,

    });


  } catch (error) {

    console.error(
      "Create Team Member Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to create team member.",

    });

  }

};



// ==================================================
// 3. UPDATE TEAM MEMBER
// ADMIN ONLY
// PUT /api/team/:id
// ==================================================

const updateTeamMember = async (
  req,
  res
) => {

  try {

    const teamMember =
      await Team.findById(
        req.params.id
      );


    // ==================================================
    // CHECK TEAM MEMBER EXISTS
    // ==================================================

    if (!teamMember) {

      return res.status(404).json({

        success: false,

        message:
          "Team member not found.",

      });

    }


    const {

      name,

      role,

      shortBio,

      bio,

      profileImage,

      email,

      linkedin,

      github,

      website,

      department,

      isFeatured,

      isPublished,

      displayOrder,

      joinedAt,

    } = req.body;


    // ==================================================
    // UPDATE NAME
    // ==================================================

    if (
      name !== undefined
    ) {

      teamMember.name =
        name.trim();

    }


    // ==================================================
    // UPDATE ROLE
    // ==================================================

    if (
      role !== undefined
    ) {

      teamMember.role =
        role.trim();

    }


    // ==================================================
    // UPDATE SHORT BIO
    // ==================================================

    if (
      shortBio !== undefined
    ) {

      teamMember.shortBio =
        shortBio;

    }


    // ==================================================
    // UPDATE FULL BIO
    // ==================================================

    if (
      bio !== undefined
    ) {

      teamMember.bio =
        bio;

    }


    // ==================================================
    // UPDATE PROFILE IMAGE
    // ==================================================

    if (
      profileImage !== undefined
    ) {

      teamMember.profileImage =
        profileImage;

    }


    // ==================================================
    // UPDATE EMAIL
    // ==================================================

    if (
      email !== undefined
    ) {

      teamMember.email =
        email;

    }


    // ==================================================
    // UPDATE LINKEDIN
    // ==================================================

    if (
      linkedin !== undefined
    ) {

      teamMember.linkedin =
        linkedin;

    }


    // ==================================================
    // UPDATE GITHUB
    // ==================================================

    if (
      github !== undefined
    ) {

      teamMember.github =
        github;

    }


    // ==================================================
    // UPDATE WEBSITE
    // ==================================================

    if (
      website !== undefined
    ) {

      teamMember.website =
        website;

    }


    // ==================================================
    // UPDATE DEPARTMENT
    // ==================================================

    if (
      department !== undefined
    ) {

      teamMember.department =
        department;

    }


    // ==================================================
    // UPDATE FEATURED STATUS
    // ==================================================

    if (
      isFeatured !== undefined
    ) {

      teamMember.isFeatured =
        isFeatured === true ||
        isFeatured === "true";

    }


    // ==================================================
    // UPDATE PUBLISHED STATUS
    // ==================================================

    if (
      isPublished !== undefined
    ) {

      const published =
        isPublished === true ||
        isPublished === "true";


      teamMember.isPublished =
        published;

    }


    // ==================================================
    // UPDATE DISPLAY ORDER
    // ==================================================

    if (
      displayOrder !== undefined
    ) {

      teamMember.displayOrder =
        Number(
          displayOrder
        ) || 0;

    }


    // ==================================================
    // UPDATE JOINED DATE
    // ==================================================

    if (
      joinedAt !== undefined
    ) {

      teamMember.joinedAt =
        joinedAt
          ? new Date(joinedAt)
          : null;

    }


    // ==================================================
    // SAVE TEAM MEMBER
    // ==================================================

    await teamMember.save();


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      message:
        "Team member updated successfully.",

      data:
        teamMember,

    });


  } catch (error) {

    console.error(
      "Update Team Member Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to update team member.",

    });

  }

};



// ==================================================
// 4. DELETE TEAM MEMBER
// ADMIN ONLY
// DELETE /api/team/:id
// ==================================================

const deleteTeamMember = async (
  req,
  res
) => {

  try {

    const teamMember =
      await Team.findById(
        req.params.id
      );


    // ==================================================
    // CHECK TEAM MEMBER EXISTS
    // ==================================================

    if (!teamMember) {

      return res.status(404).json({

        success: false,

        message:
          "Team member not found.",

      });

    }


    // ==================================================
    // DELETE TEAM MEMBER
    // ==================================================

    await Team.findByIdAndDelete(
      req.params.id
    );


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    res.status(200).json({

      success: true,

      message:
        "Team member deleted successfully.",

    });


  } catch (error) {

    console.error(
      "Delete Team Member Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to delete team member.",

    });

  }

};



// ==================================================
// EXPORT ALL CONTROLLERS
// ==================================================

module.exports = {

  getPublishedTeam,

  createTeamMember,

  updateTeamMember,

  deleteTeamMember,

};