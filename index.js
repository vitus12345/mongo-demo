const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/softwarejune')
.then(() => console.log('Connected to MongoDB......'))
.catch(err => console.log('Could not connect to MongoDB.....', err))
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: [ 'web', 'mobile', 'network'],
        lowercase: true
    },
    author: {type: String, required: true},
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            }
        },
        message: 'A course should atleast have one tag!'
    },
    date: { type: Date, default:Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})
//Course and 'Course' has to be pascal case
const Course = mongoose.model('Course', courseSchema);
// Create new data
async function createCourse(){
    const course = new Course({
        name: 'React Js course',
        author: 'Jully',
        tags: ['thing'],
        isPublished: true,
        price: 30.6,
        category: 'Web'
    })
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message)
    }
}
createCourse();

       

        // async function getCourses(){
        //     const courses = await Course.find();
        //     console.log(courses)
        // }
        // getCourses();

        // async function getCourses() {
        //     const courses = await Course.find({ author: 'Cyril', isPublished: true });
        //     console.log(courses)
        //     }

        // async function getCourses() {
        //     const courses = await Course
        //     .find({ author: 'Cyril', isPublished: true })
        //     .limit(2)
        //     .sort({ name: 1})
        //     .select({name: 1, tags: 1})
        //     console.log(courses)
        //     }
        //     getCourses() 

            // async function getCourses() {
            //     const courses = await Course
            //     .find({ author: 'Cyril', isPublished: true })
            //     .limit(2)
            //     .sort({ name: 1})
            //     .count()
            //     // .select({name: 1, tags: 1})
            //     console.log(courses)
            //     }
            //     getCourses() 
            