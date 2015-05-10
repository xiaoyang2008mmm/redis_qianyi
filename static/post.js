$(document).ready(function () {
      $("#setting_btn1").click(function () {
                if ($("#master_ip").val() == "" || $("#master_port").val() == "") {
                    alert("请输入MASTER的资料");
                } else {
                    $.post("/master_get/",
                            {
                                m_ip: $("#master_ip").val(),
                                m_port: $("#master_port").val()
                            },
                            function ( data ) {
				//data = eval(""+data+"")
				data=eval(data)
                                var innerHtml = '';
                                for (var i = 0; i < data.length; i++) {
                                    innerHtml = innerHtml + data[i] + '\r\n';
                                }
                                $('#result').val(innerHtml);
                            }
                    );
                }
        });


///////////////////////////////////////////////////////////////////////
      $("#setting_btn2").click(function () {
                if ($("#slave_1_ip").val() == "" ) {
                    alert("请输入SLAVE-1的IP地址");
                } else {
                    $.post("/slave_1_ip/",
                            {
                                s_1_ip: $("#slave_1_ip").val(),
                            },
                            function ( data ) {
				data=eval(data)
                                var innerHtml = '';
                                for (var i = 0; i < data.length; i++) {
                                    innerHtml = innerHtml + data[i] + '\n';
                                }
				$("#setting_btn2").attr("title",innerHtml);
				$("[data-toggle='tooltip']").tooltip();
                            }
                    );
                }
        });

      $("#setting_btn3").click(function () {
                if ($("#result").val() == "" ) {
                    alert("请先获取MASTER的配置文件");
                } else {
			$("#s1_config_name").val($("#result").val()) ;
	
		}
        });
//////////////////////////////////////////////////////////////////////////
      $("#setting_btn4").click(function () {
                if ($("#slave_2_ip").val() == "" ) {
                    alert("请输入SLAVE-1的IP地址");
                } else {
                    $.post("/slave_1_ip/",
                            {
                                s_1_ip: $("#slave_2_ip").val(),
                            },
                            function ( data ) {
                                data=eval(data)
                                var innerHtml = '';
                                for (var i = 0; i < data.length; i++) {
                                    innerHtml = innerHtml + data[i] + '\n';
                                }
                                $("#setting_btn4").attr("title",innerHtml);
                                $("[data-toggle='tooltip1']").tooltip();
                            }
                    );
                }
        });

      $("#setting_btn5").click(function () {
                if ($("#s1_config_name").val() == "" ) {
                    alert("请先配置SLAVE-1上的配置文件");
                } else if ($("#s1_config_name").val()==$("#result").val()){
			alert("请修改SLAVE-1的配置文件中的"+'\n'+"1.端口"+'\n'+"2.PID文件"+'\n'+"3.log文件"+'\n'+"4.rdb文件的名称");
		
		}else {
                        $("#s2_config_name").val($("#s1_config_name").val()) ;

                }
        });

//////////////////////////////////////////////////////////////////////////
      $("#second_step").click(function () {
		 $("#m1").text($("#master_ip").val());
		 $("#p1").text($("#master_port").val());
		 $("#s1").text($("#slave_1_ip").val());
		 $("#c1").text($("#config_s1").val());
		 $("#s2").text($("#slave_2_ip").val());
		 $("#c2").text($("#config_s2").val());
        });
//////////////////////////////////////////////////////////////////////////
      $("#third_step").click(function () {
		alert("wdqdqwdqwdqwdqwd");
	                    $.post("/config_total/",
                            {
                 		slave_1:		$("#slave_1_ip").val(),
                 		config_name_1:		$("#config_s1").val(),
                 		config_conteny_1:	$("#s1_config_name").val(),
                 		slave_2:		$("#slave_2_ip").val(),
                 		config_name_2:		$("#config_s2").val(),
                 		config_conteny_2:	$("#s2_config_name").val()
                            },
                            function (data) {
				alert("data");
                            }
		);
        });
});

