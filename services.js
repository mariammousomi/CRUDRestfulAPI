
var urls="http://localhost:62091/api";

app.service('myService', function($http){ 
    this.studentList = function(){        
        var response = $http.get(urls+"/Student/");
        return response; 
    };

    this.addNewStudent= function(student){
        var response =$http.post({
            method:"post",            
            url:urls+"/Student/", 
            data:JSON.stringify(student)
        });
        return response;
    };

    this.updateStudent= function(student){
        var response = $http({
            method:"post",
            url: url+"/PutStudent",
            data:JSON.stringify(student)
        });
        return response;
    };

    this.deleteStudent = function(id){
        var response = $http({
            method:"post",
            url: url+"/DeleteStudent",
            params:{StudentId:JSON(id)}
        });
        return response;
    };






    

})