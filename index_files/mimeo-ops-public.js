/* eslint-disable */
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if(typeof exports==="object"){a(require("jquery"))}else{a(jQuery)}}}(function(f){var a=/\+/g;function d(i){return b.raw?i:encodeURIComponent(i)}function g(i){return b.raw?i:decodeURIComponent(i)}function h(i){return d(b.json?JSON.stringify(i):String(i))}function c(i){if(i.indexOf('"')===0){i=i.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{i=decodeURIComponent(i.replace(a," "));return b.json?JSON.parse(i):i}catch(j){}}function e(j,i){var k=b.raw?j:c(j);return f.isFunction(i)?i(k):k}var b=f.cookie=function(q,p,v){if(p!==undefined&&!f.isFunction(p)){v=f.extend({},b.defaults,v);if(typeof v.expires==="number"){var r=v.expires,u=v.expires=new Date();u.setTime(+u+r*86400000)}return(document.cookie=[d(q),"=",h(p),v.expires?"; expires="+v.expires.toUTCString():"",v.path?"; path="+v.path:"",v.domain?"; domain="+v.domain:"",v.secure?"; secure":""].join(""))}var w=q?undefined:{};var s=document.cookie?document.cookie.split("; "):[];for(var o=0,m=s.length;o<m;o++){var n=s[o].split("=");var j=g(n.shift());var k=n.join("=");if(q&&q===j){w=e(k,p);break}if(!q&&(k=e(k))!==undefined){w[j]=k}}return w};b.defaults={};f.removeCookie=function(j,i){if(f.cookie(j)===undefined){return false}f.cookie(j,"",f.extend({},i,{expires:-1}));return !f.cookie(j)}}));


(function($) {
  'use strict';

  // Capture UTM parameters and create cookies if needed
  CaptureUTM();

  $(document).ready(function() {
      if ($('#gform_1').length) {
          console.log("Form exists - gform_1");
          var utmParams = [
              ['utm_source', 'input_13'],
              ['utm_medium', 'input_12'],
              ['utm_campaign', 'input_11'],
              ['utm_content', 'input_15'],
              ['utm_term', 'input_14']
          ];

          if ($.cookie('mimeoUTM')) {
              var mimeoUTM = JSON.parse($.cookie('mimeoUTM'));
              console.log("Cookie exists - gform_1");

              for (var i = 0; i < utmParams.length; i++) {
                  var paramName = utmParams[i][0];
                  var formFieldName = utmParams[i][1];
                  if (mimeoUTM[paramName] !== null) {
                      // Append the value of UTM variable to the corresponding form field
                      // Ensure that form fields with the specified names exist in the Marketo form
                      $('input[name="' + formFieldName + '"]').val(mimeoUTM[paramName]);
                  }
              }

              $('input[name="input_21"]').val('Online Advertising');
          }
      }
  });

  function CaptureUTM() {
      var ref = document.referrer;
      var utmParams = {
          'utm_source': '',
          'utm_medium': '',
          'utm_campaign': '',
          'utm_content': '',
          'utm_term': '',
          'siteID': '',
          'offer_code': ''
      };

      if (ref !== null && ref.indexOf('mimeo') !== -1) {
          $.cookie('mimeoOriginalURL', encodeURIComponent(ref), { expires: 1, path: '/', domain: '' });
      }

      var utmFound = false;
      for (var paramName in utmParams) {
          if (gup(paramName, document.location) !== null) {
              utmParams[paramName] = gup(paramName, document.location);
              utmFound = true;
              console.log('UTM found');
          }
      }

      if (utmFound) {
          console.log("Cookie UTM found");
          $.cookie('mimeoUTM', JSON.stringify(utmParams), { expires: 1, path: '/', domain: '' });
      }
  }

  function gup(name, url) {
      if (!url) url = location.href;
      name = name.replace(/[[]/,'\\[').replace(/[\]]/,'\\]');
      var regexS = '[\\?&]' + name + '=([^&#]*)';
      var regex = new RegExp(regexS);
      var results = regex.exec(url);
      return results === null ? null : results[1];
  }
})(jQuery); // Fully reference jQuery after this point.
