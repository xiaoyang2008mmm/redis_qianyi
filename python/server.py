# -*- coding: utf-8 -*- 
import torndb,re
import tornado.httpserver
import tornado.ioloop
import tornado.web
import sys,os
import tornado.autoreload
import time
import salt.client

from tornado.options import define, options, parse_command_line
reload(sys)
sys.setdefaultencoding('utf8')

define("port", default=80, help="run on the given port", type=int)


class Application(tornado.web.Application):
    def __init__(self):
	settings = {                                                              
     "static_path": os.path.join(os.path.dirname(__file__), "../static"),                         
     "template_path" : os.path.join(os.path.dirname(__file__), "../template"),                    
     "login_url": "/login/",                                                 
     "debug" : True,                                                      
     "cookie_secret": "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",                          
	#"xsrf_cookies":True,                                                  
	}                                                                   
                                                                    
	handlers =[                                                
    		(r"/", index),                                                       
    		(r"/master_get/", master_get),                                                       
    		(r"/slave_1_ip/", slave_1_ip),                                                       
    		(r"/config_total/", config_total),                                                       
     ]                                                             

     	tornado.web.Application.__init__(self, handlers, **settings)


class BaseHandler(tornado.web.RequestHandler):
    @property
    def db(self):
     return self.application.db
    def get_current_user(self):
     return self.get_secure_cookie("user")

class index(BaseHandler):
    def get(self):
     	self.render("index.html")

class master_get(BaseHandler):                                                                                         
    def post(self):                                                                                                 
      m_ip=self.get_argument("m_ip") 
      m_port= self.get_argument("m_port") 
      client = salt.client.LocalClient()
      ret = client.cmd(m_ip.encode('utf-8'), 'cmd.run', ['ls -l /data/server/redis/etc/ | awk \'/conf/{print $9}\' | tr "\n" ","'])
      filename=''.join(ret.values()).split(",")[:-1]
      for i in filename: 
	if re.search(m_port.encode('utf-8'),i):
	   file_path='cat /data/server/redis/etc/%s'%i
	   config_file = client.cmd(m_ip.encode('utf-8'), 'cmd.run', [file_path])
	   data= ''.join(config_file.values()).split("\n")
      self.write("%s"%data)

class slave_1_ip(BaseHandler):
    def post(self):
      s_1_ip=self.get_argument("s_1_ip")	
      client = salt.client.LocalClient()
      ret = client.cmd(s_1_ip.encode('utf-8'), 'cmd.run', ['ls -l /data/server/redis/etc/ | awk \'/conf/{print $9}\' | tr "\n" ","'])
      filename=''.join(ret.values()).split(",")[:-1]
      self.write(str(filename))
      print filename

class config_total(BaseHandler):
    def post(self):
      slave_1		=self.get_argument("slave_1")
      config_name_1	=self.get_argument("config_name_1")
      config_conteny_1	=self.get_argument("config_conteny_1")
      slave_2		=self.get_argument("slave_2")
      config_name_2	=self.get_argument("config_name_2")
      config_conteny_2	=self.get_argument("config_conteny_2")
      
      print slave_1,config_name_1,config_conteny_1,slave_2,config_name_2,config_conteny_2



def main():
    parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
