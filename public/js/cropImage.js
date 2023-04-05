var $modal = $('#cropModal');
var image = document.getElementById('image');
var cropper;

$("body").on("change", ".file-input", function(e){
	var files = e.target.files;
	var done = function (url) {
		image.src = url;
		$modal.modal('show');
	};

	var reader;
	var file;
	var url;

	if (files && files.length > 0) {
		file = files[0];

		if (URL) {
			done(URL.createObjectURL(file));
		} else if (FileReader) {
			reader = new FileReader();
			reader.onload = function (e) {
				done(reader.result);
			};
		reader.readAsDataURL(file);
		}
	}
});

$modal.on('shown.bs.modal', function () {
	cropper = new Cropper(image, {
		aspectRatio: 16/9,
		viewMode: 3,
		preview: '.preview'
	});
}).on('hidden.bs.modal', function () {
	cropper.destroy();
	cropper = null;
});

$("#crop").click(function(){
  
    canvas = cropper.getCroppedCanvas({
    //   width: 1920,
    //   height: 1080,
    });
  
    // convert canvas to blob
    canvas.toBlob(function(blob) {
  
      // create a new FormData object
      var formData = new FormData();
      
      const newsId = $('#news-id').val()
      formData.append('news_id', newsId)
      // append the blob as a file to the FormData object
      formData.append('image', blob, 'cropped_image.jpg');
  
      // send the FormData object to the server using $.ajax()
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "/news/image/update",
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){

          $modal.modal('hide');

          $('#news-original-image').attr('src', '/'+data.name)

          iziToast.success({
            title: 'Başarılı',
            message: data.message,
        });

        }
      });
    });
  });

