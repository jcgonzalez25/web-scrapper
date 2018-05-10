var Crawler = require('node-webcrawler');
var url     = require('url');
var fs      = require('fs');



//objest of image that will be loaded into array
var imageData = function(linkName,tags){
    this.linkName = linkName;
    this.tags = tags;
};
var array_links = [];

function crawlPage(amountOfPages = 1, query = null){
  var m = new Crawler({
    maxConnections: 5,
    callback : function(error, result, $){
      if(error){
        console.log(error);
      }else{
        getImageLinks($);
      }
    }
  });
  for(var i = 0; i < amountOfPages; i++){
    m.queue( i == 0? 'http://sex.com':'http://sex.com?page=' + i );
  }


}

function getTagsForImage(obj){
  var tags = [];
  //obj.parent.next.next.next.next = div element that holds the tags for the related images
  var categoryTagElements = obj.parent.next.next.next.next.children;
  for(i=0;i<categoryTagElements.length;i++){
    if(categoryTagElements[i].name == "a")
      tags.push(categoryTagElements[i].attribs.href);
  }
  return tags;
}
function hasTags(l){
    let location = l.parent.next.next.next.next;
    if(location == null){
      return false;
    }else {
      return true;
    }
}
function getImageLinks($){
  var links       = $(".image");
  var amountOfImages = links.length;
  for (var i = 0; i < amountOfImages; i++) {
    if(typeof links[i] != "undefined" && hasTags(links[i]) == true){
      let src_for_link = links[i].attribs['data-src'];
      let imgTags = getTagsForImage(links[i]);
      let tmp_link = new imageData(src_for_link,imgTags);
      array_links.push(tmp_link);
      console.log(links[i]);
    }
  }
  // TODO: convert to json and append to file
console.log(array_links);

}
function main(){
    crawlPage(2);
}
main();
