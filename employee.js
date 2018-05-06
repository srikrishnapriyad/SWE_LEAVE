db.employee.insert(
   {
       username: "nraravind@iith.ac.in", 
       password: "123", 
       name: "N R Aravind",
       gender: "M", 
       doj: Date("2016-05-18"),
       department: "Computer Science",
       position: "Assistant Professor",
       room: "F402",
       children: [ 
             {
                  name: 'sanket',
                  age: 5,
                  dob: Date("2016-05-18"),
             }
       ],
       casual: {
            credits: 5
       },
       halfpay: {
            credits: 10
       },
       commuted: {
            count: 0
       },
       earned: {
            credits: 15,
            count: 0,
            excess: 0
       },
       vacation: {
            count: 0
       },
       notdue: {
            count: 0
       },
       maternity: {
            credits: 180
       },
       paternity: {
            credits: 15,
            spells: 0
       },
       adoption: {
            credits: 180 
       },
       careleave: {
            credits: 730,
            spells: 3
       },
       extraordinary: {
            days: 0,
       }       
   }
)