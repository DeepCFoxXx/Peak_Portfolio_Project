var NewsContainer = function(container) {
  this.container = container;
  this.news = [];
};

NewsContainer.prototype.render = function(responseBody) {
  this.news = responseBody;
  this.news.forEach(function(element) {
    var storyDiv = document.createElement('div');
    storyDiv.setAttribute("class", "column");
    storyDiv.appendChild(this.createHeader(element));

    var summary = document.createElement('p');
    summary.innerText = element["summary"];
    storyDiv.appendChild(summary);

    var source = document.createElement('p');
    source.innerText = element["source"];
    storyDiv.appendChild(source);
    this.container.appendChild(storyDiv);
  }.bind(this))
};

NewsContainer.prototype.createHeader = function(element) {
  var hTag = document.createElement('h3');
  var newsLink = document.createElement('a');
  newsLink.innerText = element["headline"];
  newsLink.setAttribute('href', element["url"])
  hTag.appendChild(newsLink);
  return hTag;
};

module.exports = NewsContainer;
