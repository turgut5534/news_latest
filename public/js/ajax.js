$('.signin-form').on('submit', function(e) {

    e.preventDefault()

    const button = $(this).find('button[type="submit"]')
    button.addClass('disabled-btn')

    $.ajax({
        type: "POST", 
        url : $(this).attr('action'),
        data: $(this).serialize(),
        beforeSend: function() {
            button.disabled = true
            button.text('Lütfen bekleyiniz...')
        },
        success: function(s) {
            iziToast.success({
                title: 'Başarılı',
                message: s.message,
            });

            setTimeout(() => {
              location.href = '/'
            }, 1)
        },
        error :function(xhr, status, error) {

            const response = JSON.parse(xhr.responseText)
            button.removeClass('disabled-btn')
            button.text('Giriş Yap')
  
            iziToast.error({
                  title: 'Error',
                  message: response.message,
              });
          }
    })
})


$('.news-form').on('submit', function(e) {

    e.preventDefault()

    $.ajax({
        type: "POST", 
        url : $(this).attr('action'),
        data: $(this).serialize(),
        beforeSend: function() {
            $('#submitBtn').addClass('waiting').prop('disabled', true).html('Please wait...');
        },
        success: function(s) {

            $('#submitBtn').removeClass('waiting').prop('disabled', false).html('Submit');

            iziToast.success({
                title: 'Başarılı',
                message: s.message,
            });

            setTimeout(() => {
              location.href = '/'
            }, 1500)
        },
        error :function(xhr, status, error) {

            $('#submitBtn').removeClass('waiting').prop('disabled', false).html('Submit');
            const response = JSON.parse(xhr.responseText)
  
            iziToast.error({
                  title: 'Hata',
                  message: response.message,
              });
          }
    })
})


$('.delete-news').on('click', function(e) {
    e.preventDefault()

    Swal.fire({
        title: 'Emin misiniz?',
        text: "Haber silinecektir. Onaylıyor musunuz?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet',
        cancelButtonText: 'Hayır'
      }).then((result) => {
        if (result.isConfirmed) {

            const id = $(this).data('id')

            $.ajax({
            type: "GET",
            url : "/news/delete/"+id,
            data: { id: id} ,
            success: function() {
                iziToast.success({
                    title: 'Başarılı',
                    message: 'Başarıyla Silindi!',
                });
              
                $('.news-'+ id).remove()

                const count = $('.news').length;
                if(count == 0) {
                    $('.newsRow').append(`<p class="text-center h1">Haber bulunamadı</p>`)
                }

            },
            error: function (e) {
                console.log(e)
            }
            })
        }
      })
})

$('body').on('click', '.delete-tag', function(e) {
    e.preventDefault()

    Swal.fire({
        title: 'Emin misiniz?',
        text: "Haber silinecektir. Onaylıyor musunuz?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet',
        cancelButtonText: 'Hayır'
      }).then((result) => {
        if (result.isConfirmed) {

            const id = $(this).data('id')

            $.ajax({
            type: "GET",
            url : "/tags/delete/" +id ,
            success: function() {

                iziToast.success({
                    title: 'Başarılı',
                    message: 'Başarıyla Silindi!',
                });
                $('.tag-'+ id).remove()

                const count = $('.tags').length;
                if(count == 0) {
                    $('.tagsRow').append(`<p class="text-center h1 no-tag">Etiket bulunamadı</p>`)
                }
            },
            error: function (e) {
                console.log(e)
            }
            })
        }
      })
})


$('.abc').on('click', function () {
    $('#addTagModal').modal('show')
});

$('body').on('click', '.edit-tag', function () {
    $('#editTagModal').modal('show')
    $('.tag-edit-input').val($(this).data('name'))
    $('.tag-hidden').val($(this).data('id'))
});


$('#add-tag-form').on('submit', function (e) {

    e.preventDefault()

    const name = $('.tag-input').val()

    $.ajax({
        type: 'POST',
        url: '/tags/save',
        data: { name: name },
        dataType: 'json',
        success: function (s) {

            const count = $('.tags').length;
            if (count == 0) {
                $('.no-tag').remove()
            }
            iziToast.success({
                title: 'Başarılı',
                message: 'Etiket Kaydedildi',
            });

            $('.tagsRow').append(`<div class="col-lg-3 col-6 rounded-3 p-4 tags tag-${s.id}">
                <div style="border-radius: 15px;" class="bg-dark p-3">
        <span class="text-center d-block text-light fs-3">${s.name}</span>
        <div class="mt-3 mb-2 text-center">
            <a href="javascript:;" class="btn btn-primary edit-tag" data-id="${s.id}"
                data-name="${s.name}">Düzenle</a>
            <a class="btn btn-danger delete-tag" href="javascript:;" data-id="${s.id}">Sil</a>
        </div>
        </div>
    </div>`)

            $('#addTagModal').modal('hide')
            $('.tag-input').val('')

        },
        error: function (e) {
            console.log(e)
        }
    })
})

$('body').on('submit', '#update-tag-form', function (e) {

    e.preventDefault()

    const id = $('.tag-hidden').val()
    const name = $('.tag-edit-input').val()

    $.ajax({
        type: 'POST',
        url: "/tags/update",
        dataType: 'JSON',
        data: { id: id, name: name },
        success: function (s) {

            console.log(s.name)
            $('.tag-name-' + s.id).html(s.name)
            $('.edit-tag').attr('data-name', s.name)
            $('#editTagModal').modal('hide')

            iziToast.success({
                title: 'Başarılı',
                message: 'Etiket Güncellendi',
            });
        },
        error: function (e) {
            console.log(e)
        }
    })

})

$('.close').on('click', function () {
    const modal = $(this).data('dismiss')
    $('#' + modal).modal('hide')
})