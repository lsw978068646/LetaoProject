/**
 * Created by Administrator on 2018/1/11.
 */
$(function () {
    var $form =$('form');

    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: '用户名不存在'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
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
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    callback: {
                        message: '密码错误'
                    }

                }
            }

        }

    });
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            dataType:'json',
            success:function (info) {
                var validator = $form.data('bootstrapValidator');
                // console.log(info);
                if(info.success){
                    location.replace('./index.html')
                }
                if(info.error==1000){
                    validator.updateStatus('username', 'INVALID', 'callback')
                }
                if(info.error==1001){
                    validator.updateStatus('password', 'INVALID', 'callback')
                }
            }
        })
    });

   $('.reset').on('click',function () {
       $form.data('bootstrapValidator').resetForm();
   })








});