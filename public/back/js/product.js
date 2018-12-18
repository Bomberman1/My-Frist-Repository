
$(function () {
    var currentPage = 1
    var pageSize = 2
    //发送ajax
    rander()
    function rander() {
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                var htmlStr = template('template', res)
                $('tbody').html(htmlStr)
                //启用分页
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(res.total / res.size),
                    size: 'small',
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page
                        rander()
                    }
                })
            }
        })
    }
})

$(function () {
    // 点击添加按钮显示模态框
    var $btn = $('#addproduct')    //添加按钮
    var arr = []
    $btn.on('click', function () {
        $('#addModal').modal('show')
        //动态渲染一级分类
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 1000
            },
            dataType: 'json',
            type: 'get',
            success: function (info) {
                var str = template('template1', info)
                $('#selectorul').html(str)
                $('#selectorul').on("click", 'li', function () {
                    //给按钮赋值
                    $('#dropdownMenu1 span:nth-child(1)').text($(this).children().text())
                    //给隐藏域赋值
                    $('[name = "brandId"]').val($(this).data('id'))
                    // //手动修改错误状态
                    var validator = $("#form").data('bootstrapValidator')
                    validator.updateStatus('brandId', 'VALID')
                })
            }
        })
        //表单校验
        $('#form').bootstrapValidator({
            //指定不校验的类型，这边要校验隐藏域，所以不指定
            excluded: [],
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                brandId: {
                    validators: {
                        notEmpty: {
                            message: '一级分类不能为空'
                        },
                    }
                },
                proName: {
                    validators: {
                        notEmpty: {
                            message: '商品名称不能为空'
                        },
                    }
                },
                proDesc: {
                    validators: {
                        notEmpty: {
                            message: '商品描述不能为空'
                        },
                    }
                },
                num: {
                    validators: {
                        notEmpty: {
                            message: '库存不能为空'
                        },
                    }
                },
                size: {
                    validators: {
                        notEmpty: {
                            message: '库存不能为空'
                        },
                        regexp: {
                            regexp: /^\d{2}-\d{2}$/,
                            message: '尺码格式xx-xx'
                        }
                    }
                },
                oldPrice: {
                    validators: {
                        notEmpty: {
                            message: '原价不能为空'
                        },
                    }
                },
                price: {
                    validators: {
                        notEmpty: {
                            message: '现价不能为空'
                        },
                    }
                },
                picArr1: {
                    validators: {
                        notEmpty: {
                            message: '需要传入三张图片'
                        },
                    }
                }
            }
        })
        //图片预览功能
        $("#fileimg").fileupload({
            dataType: "json",
            //e：事件对象
            //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
            done: function (e, data) {
                console.log(data);
                var imgstr = data.result.picAddr;
                arr.push(data.result)
                //创建img并且赋值
                $('#modal-body').append('<img src=' + imgstr + ' style="width: 100px">')
                //如果图片数量大于三
                if (arr.length > 3) {
                    //替换最前面的img
                    $('#modal-body img:first-of-type()').remove()
                    //同时删除数组
                    arr.pop()
                }
                //如果图片数量等于三
                if (arr.length == 3) {
                    // 手动更换状态
                    var validator = $("#form").data('bootstrapValidator')
                    validator.updateStatus('picArr1', 'VALID')
                }
            }
        });
        //注册表单校验成功事件发送ajax
        $("#form").on('success.form.bv', function (e) {
            e.preventDefault()
            var arrstr = JSON.stringify(arr)
            var requstr = $('#form').serialize()
            requstr += '&picArr=' + arrstr
            console.log(requstr);
            //使用ajax提交逻辑
            $.ajax({
                url: '/product/addProduct',
                type: 'post',
                dataType: 'json',
                data: requstr,
                success: function (res) {
                    console.log(res);
                    if (res.success) {
                        //关闭模态框
                        $('#addModal').modal('hide')
                        var currentPage = 1
                        var pageSize = 2
                        //重新渲染
                        rander()
                        function rander() {
                            $.ajax({
                                url: '/product/queryProductDetailList',
                                type: 'get',
                                data: {
                                    page: currentPage,
                                    pageSize: pageSize
                                },
                                dataType: 'json',
                                success: function (res) {
                                    console.log(res)
                                    var htmlStr = template('template', res)
                                    $('tbody').html(htmlStr)
                                    //启用分页
                                    $('#pagintor').bootstrapPaginator({
                                        bootstrapMajorVersion: 3,
                                        currentPage: currentPage,
                                        totalPages: Math.ceil(res.total / res.size),
                                        size: 'small',
                                        onPageClicked: function (a, b, c, page) {
                                            currentPage = page
                                            rander()
                                        }
                                    })
                                }
                            })
                        }
                        //重置表单
                        var validator = $("#form").data('bootstrapValidator')
                        validator.resetForm('#form')
                        //手动清除img，修改按钮
                        $('#dropdownMenu1 span:nth-child(1)').text('请选择一级分类')
                        $('#modal-body img').remove()
                    }
                }
            })
        });
    })
})