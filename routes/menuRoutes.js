const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');


// Now saving the data of menu to the database

router.post('/', async (req,res) => {

  try {

    const data = req.body;

    const newMenuItem = new MenuItem(data);

    const response =  await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(response)

    
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }

});


router.get('/', async (req,res) => {

  try {

    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data); 

    
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});



router.get('/:taste', async (req,res) => {
  try {
    const tasteType = req.params.taste;
    if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy') {

      const response =  await MenuItem.find({taste: tasteType});
      console.log('data fetched');
      res.status(200).json(response);
      
    } else {
      res.status(404).json({error: 'Invalid tasteType'});
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }

});


router.put('/:id', async (req,res) => {

  try {

    const menuId = req.params.id;
    const menuUpdatedData = req.body;
  
    const response =  await MenuItem.findByIdAndUpdate(menuId,menuUpdatedData, {
      new: true,
      runValidators: true
    });
  
    if(!response) {
      return res.status(404).json({error: 'Menu item not found'});
    }
  
    console.log('Data updated');
    res.status(200).json(response);
    
  } catch (err) {

    console.log(err);
    res.status(500).json({error: 'Internal server error'});
    
  }
 

});

router.delete('/:id', async (req,res) => {
  try {

    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuId);

    if(!response) {
      return res.status(404).json({error: 'Menu item is not found'});
    }

    console.log('Data deleted');
    res.status(200).json({message: 'Menu record deleted successfully' })
    
  } catch (err) {

    console.log(err);
    res.status(500).json({error: 'Internal server error'});

  }
});





module.exports = router;

