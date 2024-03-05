const express = require("express");
const router = express.Router();
const Blogs = require("../models/BlogsModel");

router.get("/appData", async (req, res, next) => {
  try {
    const aggregatedBlogsWithCommentsCount = await Blogs.aggregate([
      // Match blogs with specified categories
      {
        $match: {
          category: { $in: ['Banner', 'Travel', 'Travel','News', 'Educative'] }
        }
      },
      // Lookup comments count for each blog
      {
        $lookup: {
          from: 'comments', // Name of the Comments collection
          localField: '_id', // Field in the Blog collection
          foreignField: 'blog', // Field in the Comments collection
          as: 'comments'
        }
      },
      {
        $sort: {
          category: 1,
          createdAt: -1
        }
      },
      // Group blogs by category and take latest 4 blogs for each category
      {
        $group: {
          _id: '$category',
          blogs: { $push: '$$ROOT' }
        }
      },
      // Project only the latest blog for 'Banner' category and 4 latest blogs for other categories
      {
        $project: {
          _id: 0,
          category: '$_id',
          blogs: {
            $cond: {
              if: { $eq: ['$_id', 'Banner'] },
              then: { $slice: ['$blogs', 1] },
              else: { $slice: ['$blogs', 4] }
            }
          }
        }
      },
      // Lookup user data for each blog
      {
        $lookup: {
          from: 'users', // Name of the User collection
          localField: 'blogs.user', // Field in the Blog collection
          foreignField: '_id', // Field in the User collection
          as: 'user'
        }
      },
      // Unwind the user array to flatten the result
      {
        $unwind: '$user'
      },
      // Replace the user ID with the user data
      {
        $project: {
          category: 1,
          blogs: {
            $map: {
              input: '$blogs',
              as: 'blog',
              in: {
                $mergeObjects: ['$$blog', { user: '$user' }]
              }
            }
          }
        }
      }
    ]);

    // Format the response
    const formattedBlogs = aggregatedBlogsWithCommentsCount.reduce((acc, cur) => {
      acc[cur.category.toLowerCase().replace(/\s/g, "")] = cur.blogs;
      return acc;
    }, {});
    res.status(200).json(formattedBlogs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
