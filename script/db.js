var category = "create table category(cate_id integer PRIMARY KEY AUTOINCREMENT, cate_name varchar(255))";

var tag = "create table tag(tag_id integer PRIMARY KEY AUTOINCREMENT, room_id integer, tag_code varchar(255), tag_name varchar(255), tag_pic varchar(255))";

var room = "create table room(room_id integer PRIMARY KEY AUTOINCREMENT, room_code varchar(255), room_name varchar(255))";

var tags_categories = "create table tags_categories(cate_id integer not null, tag_id integer not null, primary key (cate_id, tag_id))";

var courses_tags = "create table courses_tags(tag_id integer not null, course_code varchar(255) not null, primary key (tag_id, course_code))";



var classes = "create table classes(classes_code varchar(255) not null, grade_code varchar(255), classes_name varchar(255), primary key (classes_code))";

var course = "create table course(course_code varchar(255) not null, course_name varchar(255), primary key (course_code))";



var courses_weeks = "create table courses_weeks(week_id int not null, course_code varchar(255) not null, primary key (week_id, course_code))";

var grade = "create table grade(grade_code varchar(255) not null, grade_name varchar(255), primary key (grade_code))";
var student = "create table student(stu_account varchar(255) not null, classes_code varchar(255), stu_name varchar(255), primary key (stu_account))";

var students_courses = "create table students_courses(course_code varchar(255) not null, stu_account varchar(255) not null, primary key (course_code, stu_account))";



var week = "create table week(week_id int not null, week_name varchar(255), primary key (week_id))";

var insert0 = "insert into category(cate_name) values('4sf')";
var insert1 = "insert into category(cate_name) values('sidfb')";


function db() {
    var db = api.require('db');
    db.openDatabase({
        name: 'nfc'
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createcategory() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: category
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createclasses() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: classes
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createcourse() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: course
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createcourses_tags() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: courses_tags
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createcourses_weeks() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: courses_weeks
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function creategrade() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: grade
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createstudent() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: student
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createstudents_courses() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: students_courses
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createtag() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: tag
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createtags_categories() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: tags_categories
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function createweek() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: week
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function insertdata() {
    var db = api.require('db');
    db.executeSql({
        name: 'nfc',
        sql: insert0
    }, function(ret, err) {
        if (ret.status) {
            db.executeSql({
                name: 'nfc',
                sql: insert1
            }, function(ret, err) {
                if (ret.status) {
                    api.alert({
                        title: 'testtitle',
                        msg: '两条数据插入成功',
                    }, function(ret, err) {

                    });

                } else {
                    api.alert({
                        title: 'testtitle',
                        msg: '两条数据插入失败',
                    }, function(ret, err) {

                    });
                }
            });
        } else {
            api.alert({
                title: 'testtitle',
                msg: '第一条数据插入失败',
            }, function(ret, err) {

            });
        }
    });
}

function selectdata() {
    var db = api.require('db');
    db.selectSql({
        name: 'nfc',
        sql: 'SELECT * FROM category'
    }, function(ret, err) {
        if (ret.status) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}





<script>

    var category = "create table category(cate_id integer PRIMARY KEY AUTOINCREMENT, cate_name varchar(255))";

    var tag = "create table tag(tag_id integer PRIMARY KEY AUTOINCREMENT, room_id integer, tag_code varchar(255), tag_name varchar(255), tag_pic varchar(255))";

    var room = "create table room(room_id integer PRIMARY KEY AUTOINCREMENT, room_code varchar(255), room_name varchar(255), primary key (room_id))";

    var tags_categories = "create table tags_categories(cate_id integer not null, tag_id integer not null, primary key (cate_id, tag_id))";

    var courses_tags = "create table courses_tags(tag_id integer not null, course_code varchar(255) not null, primary key (tag_id, course_code))";


    var classes = "create table classes(classes_code varchar(255) not null, grade_code varchar(255), classes_name varchar(255), primary key (classes_code))";

    var course = "create table course(course_code varchar(255) not null, course_name varchar(255), primary key (course_code))";

    var courses_weeks = "create table courses_weeks(week_id int not null, course_code varchar(255) not null, primary key (week_id, course_code))";

    var grade = "create table grade(grade_code varchar(255) not null, grade_name varchar(255), primary key (grade_code))";

    var student = "create table student(stu_account varchar(255) not null, classes_code varchar(255), stu_name varchar(255), primary key (stu_account))";

    var students_courses = "create table students_courses(course_code varchar(255) not null, stu_account varchar(255) not null, primary key (course_code, stu_account))";

    var week = "create table week(week_id int not null, week_name varchar(255), primary key (week_id))";

    var insert0 = "insert into category(cate_name) values('4sf')";
    var insert1 = "insert into category(cate_name) values('sidfb')";

    function delete(table) {
        var sql = "drop table " + table;
        db.executeSql({
            name: 'nfc',
            sql: sql
        }, function(ret, err) {
            if (ret.status) {
                alert("success");
            } else {
                alert("fail");
            }
        });
    }

    function firstdb() {


        var db = api.require('db');
        db.openDatabase({
            name: 'nfc'
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });

    }

    function createcategory() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: category
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function createclasses() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: classes
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function createcourse() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: course
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function createcourses_tags() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: courses_tags
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function createcourses_weeks() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: courses_weeks
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function creategrade() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: grade
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function createstudent() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: student
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function createstudents_courses() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: students_courses
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function createtag() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: tag
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function createtags_categories() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: tags_categories
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function createweek() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: week
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function insertdata() {
        var db = api.require('db');
        db.executeSql({
            name: 'nfc',
            sql: insert0
        }, function(ret, err) {
            if (ret.status) {
                db.executeSql({
                    name: 'nfc',
                    sql: insert1
                }, function(ret, err) {
                    if (ret.status) {
                        api.alert({
                            title: 'testtitle',
                            msg: '两条数据插入成功',
                        }, function(ret, err){

                        });

                    }
                    else {
                        api.alert({
                            title: 'testtitle',
                            msg: '两条数据插入失败',
                        }, function(ret, err){

                        });
                    }
                });
            }
            else {
                api.alert({
                    title: 'testtitle',
                    msg: '第一条数据插入失败',
                }, function(ret, err){

                });
            }
        });
    }

    function selectdata() {
        var db = api.require('db');
        db.selectSql({
            name: 'nfc',
            sql: 'SELECT * FROM category'
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }
</script>
