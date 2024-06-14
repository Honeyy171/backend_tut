const express = require('express');
const router = express.Router();

const Person = require('./../models/Person');



router.post('/', async (req,res) => {
  
  try {
      const data = req.body // Assuming the request body contains the person data

      // create a new Person document using the Mongoose model
    
      const newPerson = new Person(data);
    
      // Save the new Person to the database
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);    
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    
  }
 
});


// GET Method to get the person all data

router.get('/', async (req,res) => {
  try {
    
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);    


  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    
  }
});


router.get('/:workType', async (req,res) => {
  try {
    
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'waiter' || workType == 'manager') {
      
      const response = await Person.find({work: workType});
      console.log('response fetched ');
      res.status(200).json(response)
    } else {
      res.status(404).json({error: 'Invalid work type'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.put('/:id', async (req,res) => {
  try {
    
    const personId = req.params.id;     // Extract the id from the URL parameter
    const updatedPersonData = req.body;  // updated data for the person
    
    const response =  await Person.findByIdAndUpdate(personId,updatedPersonData, {
      new: true,   // Return the updated document in response
      runValidators: true,   // Run Mongoose validation like type,required etc...
      });

      if(!response) {

        return res.status(404).json({error: 'Person not Found'});
      }

      console.log('data fetched');
      res.status(200).json(response);

    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
  }


});


router.delete('/:id',  async (req,res) => {

  try {
    const personId = req.params.id;     // Extract the id from the URL parameter

    const response = await Person.findByIdAndDelete(personId);

    if(!response) {
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('Data deleted');
    res.status(200).json({message: "Person record deleted successfully"});



  } catch (error) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }

});



module.exports = router;

