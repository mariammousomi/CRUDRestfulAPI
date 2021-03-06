app.controller("myController", function($scope, myService){
    getStudentList();
    $scope.StudentList
    $scope.newStudent = {};

    $scope.edithideAndShow=true;
    $scope.$watch('edithideAndShow', function(){
        $scope.buttonValueEdit=$scope.edithideAndShow ? 'Off' : 'On';
    })

    $scope.viewhideAndShow=true;
    $scope.$watch('viewhideAndShow', function(){
        $scope.buttonValueView=$scope.viewhideAndShow ? 'Off' : 'On';
    })

    $scope.deletehideAndShow=true;
    $scope.$watch('deletehideAndShow', function(){
        $scope.buttonValueDelete=$scope.deletehideAndShow ? 'Off' : 'On';
    })


    $scope.createhideAndShow=true;
    $scope.$watch('createhideAndShow', function(){
        $scope.buttonValueCreate=$scope.createhideAndShow ? 'Off' : 'On';
    })

    $scope.clickedStudentData = {};
    $scope.Message="";

    
 
    function getStudentList(){
        myService.studentList().then(function(result){
            $scope.Student = result.data;
        }, function(err){
            console.log(err);
        });
    };

    $scope.addstudent = function(){
        myService.addNewStudent($scope.newStudent).then(function(result){
            $scope.newStudent={};
            alert($scope.Message="Data Save Successfully");
        }, function(err){
            console.log(err);
        })
        getStudentList();
    }

    $scope.selectedStudent=function(student){
        $scope.clickedStudentData(student);
    }

    $scope.updateStudent = function(){
        myService.updateStudent($scope.clickedStudentData).then(function(result){
            alert($scope.Message="Update Successfully"); 
        }, function(err){
            console.log(err);
        })
        getStudentList();
    }

    $scope.deleteStudent = function(){
        myService.deleteStudent($scope.clickedStudentData.StudentId).then(function(){
            alert($scope.Message="Data has been deleted"); 
        }, function(err){
            console.log(err);
        })
    }


    //For Login
    $scope.IsLogedIn=false;
    $scope.Submitted=false;
    $scope.IsFormValid=false;
    
    $scope.LoginData={

        UserName:'',
        Password:''
    };

    $scope.$watch(
        'f1',function(newVal){
            $scope.IsFormValid=newVal;
        });

        $scope.Login= function(){
            $scope.Submitted=true;
            if($scope.IsFormValid){
                myService.GetUser($scope.LoginData).then(function(d){
                    if(d.data.UserName != null){
                        $scope.IsLogedIn=true;
                        $scope.Message="Successfully Loged in"+d.data.userName;
                    }
                    else {
                        alert("Invalid Credential");
                    }
                });
            }
        };


    var fac={};
    fac.GetUser=function(d){
        return $http({
            url:'',
            method:'POST',
            data:JSON.stringify(d),
            headers:{'content-type':'application/json'}
        });
    };
    return fac;
})