$(function () {
    console.log($('#form'));
    
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名必须是2-6位之间'
                    },
                    callback:{
                        message : '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '密码必须是6-30位之间'
                    },
                    callback:{
                        message : '密码错误'
                    }
                }
            }

        }
    })
})

$(function () {
    //1.重置功能
    //注册点击事件
    //1.创建bootstrapvaliter实例
    //2.调用resetForm(Boolean)方法
    var $reset = $('.reset');
    var validator = $("#form").data('bootstrapValidator')
    $reset.on('click', function () {
        validator.resetForm()
    })
    //2.表单校验完成，阻止默认行为，根据返回结果动态渲染
    $('.submit').on('click', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.error == 1000) {
                    //修改表单提示 ‘用户名不存在’
                    //使用updateStatus(field, status, validatorName)方法更新字段的状态
                    // 参数1: 字段名称 (username)
                    // 参数2: 校验状态 NOT_VALIDATED未校验, VALIDATING校验中, INVALID失败 or VALID成功
                    validator.updateStatus('username', 'INVALID' , 'callback')
                }
                if (res.error == 1001) {
                    //修改表单提示 ‘密码错误’
                    //使用updateStatus(field, status, validatorName)方法更新字段的状态
                    validator.updateStatus('password','INVALID','callback')
                }
                console.log(res);
                if(res.success){
                    location.href = "index.html"
                }          
            }
        })
    })
})