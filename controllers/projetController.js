const express = require('express');
const Project  = require('../models/project');
const auth = require('../middleware/verifyToken');
var ObjectId = require('mongoose').Types.ObjectId;
const projectRouter = express.Router();


 projectRouter.get('/',(req, res) => {
    Project.find((err, docs) => {
        if (!err) { res.send(docs); }
       else { console.log('Error in Retriving Projects:' + JSON.stringify(err, undefined, 2)); }
    });
});
// ajouter  auth 
projectRouter.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404);
        }
        res.status(200).send(project);
    } catch (error) {
        res.status(500).send(error);
    }
});

/*projectRouter.post('/',async(req,res)=> {
    const project = new Project(req.body);
    try{
        await Project.save();
        res.status(201).send(project);
    }catch (error){
        res.status(580).send(error);
    }
    });*/
// this post
    projectRouter.post('/', (req, res) => {
       /*var manager_id = req.decoded._id;*/
        const project = new Project({
            title: req.body.title,
            budget: req.body.budget,
            Start_Date: req.body.Start_Date,
            End_Date: req.body.End_Date,
            description: req.body.description,
            manager:req.body.manager,
            assignee:req.body.assignee,
            /*tasks:req.body.tasks*/
        });
        project.save()
      
    });

    /*projectRouter.post('/',  async (req, res) => {
        try {
            const project = new Project(req.body);
            project.manager = req.user._id;
            await project.save();
            res.status(201).send(project);
        } catch (error) {
            res.status(400).send();
        }
    });
*/
    projectRouter.patch('/:id', (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);
    
        
        Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Project  Update :' + JSON.stringify(err, undefined, 2)); }
        });
    });

    projectRouter.delete('/:id', async (req, res) => {
        try {
            const project = await Project.findByIdAndDelete(req.params.id);
            if (!project) {
                return res.status(404).send();
            }
            res.send(project);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    


   
/*

      //-----------------------------------------------------
//   Get Projects//

projectRouter.get('/all', function(req, res) {

	var user_id = req.decoded._id;
	console.log("get all project for user: " + user_id);

	Project.find( {manager: user_id})
	.populate('assignee',['_id', 'first_name', 'last_name', 'email'])
  .populate('manager',['_id', 'first_name', 'last_name', 'email'])
	.exec(function(err, projects) {

		if(err) {
			res.send(err);
      console.log("get project error "+err);
			return;
		}
		res.json(projects);
	});
});*/
    module.exports = projectRouter ;