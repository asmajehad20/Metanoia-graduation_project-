const con = require('../dbConnection');
const path = require('path')

module.exports.sendSubjects_get = (req, res)=>{//بدي المواد بكل التخصصات في كل الكليات في حال بدي ابحث على المادة بشكل سريع
    //في حال ما كان محدد اي اشي لست المواد لازم تعرض كل المواد جوا فلات لست
    //ولازم تعرض كل التخصصات بكل الكليات
    //ولازم تعرض كل الكليات
    //بس يختار المادة لازم قائمة التخصص والكلية تظهر القيمة الصحيحة لوين المادة تنتمي 

    // for now ill get all subjects 
    let sql = "SELECT * from subject";
    con.query(sql, function(err, result, fields){
        if(err){
            console.log(err)
        }else{
            // console.log("selected from subjects !!!!")
            console.log("result");
            // res.json(result);
            res.send(result)
        }
    })
}

//get subject by name // by number
//two functions 



module.exports.sendSubjectsBySpecialty_get = (req, res)=>{//بدي المواد بس اخصص التخصص 
    //في حال خصص التخصص لازم قائمة التخصات تثبت على التخصص تبعو وهون لازم ابعت بالفتش التخصص الي بدو اياه
    //قائمة الكليات لازم تحدد الكلية الي التخصص الي اختارو يندرج تحتها
    //وقائمة المواد رح تجيب بس مواد هاد التخصص
}


module.exports.sendSpecialtyByDepartment_get = (req, res)=>{//بدي المواد الي تحت كل التخصصات بكلية معينة 
    //في حال بدو يحدد الكلية قائمة التخصصات بتصغر وقائمة المواد كمان بتححد شوي 
    //

}