
function getData(cb) {
  $.ajax({
    url : localhost:3000/searchOrder,
    method : "GET",
    success : function(data) {
      cb(null, data);
    },
    error : function(err) {
      cb(err);
    }
  });
}
