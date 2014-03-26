// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

//canvastoblob
(function(view){"use strict";var
Uint8Array=view.Uint8Array,HTMLCanvasElement=view.HTMLCanvasElement,canvas_proto=HTMLCanvasElement&&HTMLCanvasElement.prototype,is_base64_regex=/\s*;\s*base64\s*(?:;|$)/i,to_data_url="toDataURL",base64_ranks,decode_base64=function(base64){var
len=base64.length,buffer=new Uint8Array(len/4*3|0),i=0,outptr=0,last=[0,0],state=0,save=0,rank,code,undef;while(len--){code=base64.charCodeAt(i++);rank=base64_ranks[code-43];if(rank!==255&&rank!==undef){last[1]=last[0];last[0]=code;save=(save<<6)|rank;state++;if(state===4){buffer[outptr++]=save>>>16;if(last[1]!==61){buffer[outptr++]=save>>>8;}
if(last[0]!==61){buffer[outptr++]=save;}
state=0;}}}
return buffer;};if(Uint8Array){base64_ranks=new Uint8Array([62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);}
if(HTMLCanvasElement&&!canvas_proto.toBlob){canvas_proto.toBlob=function(callback,type){if(!type){type="image/png";}if(this.mozGetAsFile){callback(this.mozGetAsFile("canvas",type));return;}
var
args=Array.prototype.slice.call(arguments,1),dataURI=this[to_data_url].apply(this,args),header_end=dataURI.indexOf(","),data=dataURI.substring(header_end+1),is_base64=is_base64_regex.test(dataURI.substring(0,header_end)),blob;if(Blob.fake){blob=new Blob
if(is_base64){blob.encoding="base64";}else{blob.encoding="URI";}
blob.data=data;blob.size=data.length;}else if(Uint8Array){if(is_base64){blob=new Blob([decode_base64(data)],{type:type});}else{blob=new Blob([decodeURIComponent(data)],{type:type});}}
callback(blob);};if(canvas_proto.toDataURLHD){canvas_proto.toBlobHD=function(){to_data_url="toDataURLHD";var blob=this.toBlob();to_data_url="toDataURL";return blob;}}else{canvas_proto.toBlobHD=canvas_proto.toBlob;}}}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content||this));

//blob
if(typeof Blob!=="function"||typeof URL==="undefined")
if(typeof Blob==="function"&&typeof webkitURL!=="undefined")var URL=webkitURL;else var Blob=(function(view){"use strict";var BlobBuilder=view.BlobBuilder||view.WebKitBlobBuilder||view.MozBlobBuilder||view.MSBlobBuilder||(function(view){var
get_class=function(object){return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];},FakeBlobBuilder=function BlobBuilder(){this.data=[];},FakeBlob=function Blob(data,type,encoding){this.data=data;this.size=data.length;this.type=type;this.encoding=encoding;},FBB_proto=FakeBlobBuilder.prototype,FB_proto=FakeBlob.prototype,FileReaderSync=view.FileReaderSync,FileException=function(type){this.code=this[this.name=type];},file_ex_codes=("NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "+"NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR").split(" "),file_ex_code=file_ex_codes.length,real_URL=view.URL||view.webkitURL||view,real_create_object_URL=real_URL.createObjectURL,real_revoke_object_URL=real_URL.revokeObjectURL,URL=real_URL,btoa=view.btoa,atob=view.atob,can_apply_typed_arrays=false,can_apply_typed_arrays_test=function(pass){can_apply_typed_arrays=!pass;},ArrayBuffer=view.ArrayBuffer,Uint8Array=view.Uint8Array;FakeBlob.fake=FB_proto.fake=true;while(file_ex_code--){FileException.prototype[file_ex_codes[file_ex_code]]=file_ex_code+1;}
try{if(Uint8Array){can_apply_typed_arrays_test.apply(0,new Uint8Array(1));}}catch(ex){}
if(!real_URL.createObjectURL){URL=view.URL={};}
URL.createObjectURL=function(blob){var
type=blob.type,data_URI_header;if(type===null){type="application/octet-stream";}
if(blob instanceof FakeBlob){data_URI_header="data:"+type;if(blob.encoding==="base64"){return data_URI_header+";base64,"+blob.data;}else if(blob.encoding==="URI"){return data_URI_header+","+decodeURIComponent(blob.data);}if(btoa){return data_URI_header+";base64,"+btoa(blob.data);}else{return data_URI_header+","+encodeURIComponent(blob.data);}}else if(real_create_object_URL){return real_create_object_URL.call(real_URL,blob);}};URL.revokeObjectURL=function(object_URL){if(object_URL.substring(0,5)!=="data:"&&real_revoke_object_URL){real_revoke_object_URL.call(real_URL,object_URL);}};FBB_proto.append=function(data){var bb=this.data;if(Uint8Array&&(data instanceof ArrayBuffer||data instanceof Uint8Array)){if(can_apply_typed_arrays){bb.push(String.fromCharCode.apply(String,new Uint8Array(data)));}else{var
str="",buf=new Uint8Array(data),i=0,buf_len=buf.length;for(;i<buf_len;i++){str+=String.fromCharCode(buf[i]);}}}else if(get_class(data)==="Blob"||get_class(data)==="File"){if(FileReaderSync){var fr=new FileReaderSync;bb.push(fr.readAsBinaryString(data));}else{throw new FileException("NOT_READABLE_ERR");}}else if(data instanceof FakeBlob){if(data.encoding==="base64"&&atob){bb.push(atob(data.data));}else if(data.encoding==="URI"){bb.push(decodeURIComponent(data.data));}else if(data.encoding==="raw"){bb.push(data.data);}}else{if(typeof data!=="string"){data+="";}
bb.push(unescape(encodeURIComponent(data)));}};FBB_proto.getBlob=function(type){if(!arguments.length){type=null;}
return new FakeBlob(this.data.join(""),type,"raw");};FBB_proto.toString=function(){return"[object BlobBuilder]";};FB_proto.slice=function(start,end,type){var args=arguments.length;if(args<3){type=null;}
return new FakeBlob(this.data.slice(start,args>1?end:this.data.length),type,this.encoding);};FB_proto.toString=function(){return"[object Blob]";};return FakeBlobBuilder;}(view));return function Blob(blobParts,options){var type=options?(options.type||""):"";var builder=new BlobBuilder();if(blobParts){for(var i=0,len=blobParts.length;i<len;i++){builder.append(blobParts[i]);}}
return builder.getBlob(type);};}(self));

//filesaver
var saveAs=saveAs||(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator))||(function(view){"use strict";var
doc=view.document,get_URL=function(){return view.URL||view.webkitURL||view;},URL=view.URL||view.webkitURL||view,save_link=doc.createElementNS("http://www.w3.org/1999/xhtml","a"),can_use_save_link=!view.externalHost&&"download"in save_link,click=function(node){var event=doc.createEvent("MouseEvents");event.initMouseEvent("click",true,false,view,0,0,0,0,0,false,false,false,false,0,null);node.dispatchEvent(event);},webkit_req_fs=view.webkitRequestFileSystem,req_fs=view.requestFileSystem||webkit_req_fs||view.mozRequestFileSystem,throw_outside=function(ex){(view.setImmediate||view.setTimeout)(function(){throw ex;},0);},force_saveable_type="application/octet-stream",fs_min_size=0,deletion_queue=[],process_deletion_queue=function(){var i=deletion_queue.length;while(i--){var file=deletion_queue[i];if(typeof file==="string"){URL.revokeObjectURL(file);}else{file.remove();}}
deletion_queue.length=0;},dispatch=function(filesaver,event_types,event){event_types=[].concat(event_types);var i=event_types.length;while(i--){var listener=filesaver["on"+event_types[i]];if(typeof listener==="function"){try{listener.call(filesaver,event||filesaver);}catch(ex){throw_outside(ex);}}}},FileSaver=function(blob,name){var
filesaver=this,type=blob.type,blob_changed=false,object_url,target_view,get_object_url=function(){var object_url=get_URL().createObjectURL(blob);deletion_queue.push(object_url);return object_url;},dispatch_all=function(){dispatch(filesaver,"writestart progress write writeend".split(" "));},fs_error=function(){if(blob_changed||!object_url){object_url=get_object_url(blob);}
if(target_view){target_view.location.href=object_url;}else{window.open(object_url,"_blank");}
filesaver.readyState=filesaver.DONE;dispatch_all();},abortable=function(func){return function(){if(filesaver.readyState!==filesaver.DONE){return func.apply(this,arguments);}};},create_if_not_found={create:true,exclusive:false},slice;filesaver.readyState=filesaver.INIT;if(!name){name="download";}
if(can_use_save_link){object_url=get_object_url(blob);doc=view.document;save_link=doc.createElementNS("http://www.w3.org/1999/xhtml","a");save_link.href=object_url;save_link.download=name;var event=doc.createEvent("MouseEvents");event.initMouseEvent("click",true,false,view,0,0,0,0,0,false,false,false,false,0,null);save_link.dispatchEvent(event);filesaver.readyState=filesaver.DONE;dispatch_all();return;}
if(view.chrome&&type&&type!==force_saveable_type){slice=blob.slice||blob.webkitSlice;blob=slice.call(blob,0,blob.size,force_saveable_type);blob_changed=true;}
if(webkit_req_fs&&name!=="download"){name+=".download";}
if(type===force_saveable_type||webkit_req_fs){target_view=view;}
if(!req_fs){fs_error();return;}
fs_min_size+=blob.size;req_fs(view.TEMPORARY,fs_min_size,abortable(function(fs){fs.root.getDirectory("saved",create_if_not_found,abortable(function(dir){var save=function(){dir.getFile(name,create_if_not_found,abortable(function(file){file.createWriter(abortable(function(writer){writer.onwriteend=function(event){target_view.location.href=file.toURL();deletion_queue.push(file);filesaver.readyState=filesaver.DONE;dispatch(filesaver,"writeend",event);};writer.onerror=function(){var error=writer.error;if(error.code!==error.ABORT_ERR){fs_error();}};"writestart progress write abort".split(" ").forEach(function(event){writer["on"+event]=filesaver["on"+event];});writer.write(blob);filesaver.abort=function(){writer.abort();filesaver.readyState=filesaver.DONE;};filesaver.readyState=filesaver.WRITING;}),fs_error);}),fs_error);};dir.getFile(name,{create:false},abortable(function(file){file.remove();save();}),abortable(function(ex){if(ex.code===ex.NOT_FOUND_ERR){save();}else{fs_error();}}));}),fs_error);}),fs_error);},FS_proto=FileSaver.prototype,saveAs=function(blob,name){return new FileSaver(blob,name);};FS_proto.abort=function(){var filesaver=this;filesaver.readyState=filesaver.DONE;dispatch(filesaver,"abort");};FS_proto.readyState=FS_proto.INIT=0;FS_proto.WRITING=1;FS_proto.DONE=2;FS_proto.error=FS_proto.onwritestart=FS_proto.onprogress=FS_proto.onwrite=FS_proto.onabort=FS_proto.onerror=FS_proto.onwriteend=null;view.addEventListener("unload",process_deletion_queue,false);return saveAs;}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content));if(typeof module!=="undefined")module.exports=saveAs;