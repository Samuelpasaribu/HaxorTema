document.addEventListener('DOMContentLoaded', function () {
    var darkToggler = document.getElementById('dark-toggler');

    darkToggler.addEventListener('click', function () {
        this.classList.toggle('active');
    });
});
let cartItems=[];function getCartItemsFromLocalStorage(){let t=localStorage.getItem("cartItems");t&&(cartItems=JSON.parse(t))}function saveCartItemsToLocalStorage(){localStorage.setItem("cartItems",JSON.stringify(cartItems))}function addToCart(t,e){cartItems.push({name:t,price:e}),updateCartIcon(),showCart(),saveCartItemsToLocalStorage(),showSuccessNotification()}function loadCartOnPageLoad(){getCartItemsFromLocalStorage(),updateCartIcon(),showCart()}function clearCartLocalStorage(){localStorage.removeItem("cartItems"),cartItems=[],updateCartIcon(),showCart()}function updateCartIcon(){let t=document.querySelector(".cart-icon");t.setAttribute("data-count",cartItems.length)}function toggleCart(){let t=document.getElementById("cart");t.classList.toggle("show")}function showCart(){let t=document.getElementById("cart-items");t.innerHTML="";let e=0;for(let a=0;a<cartItems.length;a++){let o=cartItems[a],r=document.createElement("div");r.classList.add("product"),r.innerHTML=`
                            <span>${o.name}</span>
                            <span>Harga: IDR ${o.price}</span>
                            <button onclick="removeFromCart(${a})">Hapus</button>
                        `,t.appendChild(r),e+=o.price}let n=document.getElementById("cart-total");n.innerHTML=`<b style="font-size:16px;">Total Pembayaran :</b> IDR ${e}`}function removeFromCart(t){cartItems.splice(t,1),updateCartIcon(),showCart(),saveCartItemsToLocalStorage()}function showSuccessNotification(){let t=document.createElement("div");t.classList.add("notification"),t.textContent="Berhasil ditambahkan ke keranjang!",document.body.appendChild(t),setTimeout(function(){t.classList.remove("show"),setTimeout(function(){document.body.removeChild(t)},300)},3e3),setTimeout(function(){t.classList.add("show")},10)}window.addEventListener("load",loadCartOnPageLoad);
  // Fungsi untuk menampilkan dan menyembunyikan form WhatsApp
  $(".form-close").click(function() {
      $(".samuelpasaribu-form-wa").fadeOut("fast");
  });

  $(".show-form").click(function() {
      $(".samuelpasaribu-form-wa").fadeIn("slow");
  });

  // Fungsi untuk validasi kolom wajib diisi
  $('.samuelpasaribu-input-field .validate').each(function() {
      title = $(this).attr('name');
      label = $(this).parents('.samuelpasaribu-input-field');
      $('<span class="samuelpasaribu-validasi"><b>' + title + '</b> diperlukan</span>').appendTo(label);
  });

  $(document).on('keyup', '.samuelpasaribu-input-field .validate', function() {
      if ($(this).val() != '') {
          $(this).removeClass('focus');
          $(this).parents('.samuelpasaribu-input-field').find('.samuelpasaribu-validasi').removeClass('show');
      }
  });

  $(document).on('change', '.samuelpasaribu-input-field select', function() {
      $(this).removeClass('focus');
      $(this).parents('.samuelpasaribu-input-field').find('.samuelpasaribu-validasi').removeClass('show');
  });

  // Fungsi untuk mengambil geolokasi pengguna
  function getGeolocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              function(position) {
                  var latitude = position.coords.latitude;
                  var longitude = position.coords.longitude;
                  var googleMapsLink = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;
                  $("#wa_alamat").val(googleMapsLink);
                  // Hilangkan pesan validasi jika alamat terisi
                  $("#wa_alamat").removeClass('focus').parents('.samuelpasaribu-input-field').find('.samuelpasaribu-validasi').removeClass('show');
              },
              function(error) {
                  console.log('Gagal mengambil lokasi: ' + error.message);
              }
          );
      } else {
          console.log('Geolokasi tidak didukung di browser Anda.');
      }
  }

  // Fungsi untuk mengirim pesan WhatsApp saat tombol "KIRIM" diklik
  $('#order-form').submit(function(e) {
      e.preventDefault();
      var isValid = true;

      $('.samuelpasaribu-input-field .validate').each(function() {
          if ($(this).val() == '') {
              $(this).addClass('focus');
              $(this).parents('.samuelpasaribu-input-field').find('.samuelpasaribu-validasi').addClass('show');
              isValid = false;
          }
      });

      if ($('#wa_lisensi').val() == 'default') { // Validasi Lisensi
          $('#wa_lisensi').addClass('focus').parents('.samuelpasaribu-input-field').find('.samuelpasaribu-validasi').addClass('show');
          isValid = false;
      }

      if ($('#wa_pembayaran').val() == 'default') { // Validasi Pembayaran
          $('#wa_pembayaran').addClass('focus').parents('.samuelpasaribu-input-field').find('.samuelpasaribu-validasi').addClass('show');
          isValid = false;
      }

      if (input_alamat == '') {
          $("#wa_alamat").addClass('focus').parents('.samuelpasaribu-input-field').find('.samuelpasaribu-validasi').addClass('show');
          isValid = false;
      }

      if (!isValid) {
          return false;
      } else {
          // Pengaturan WhatsApp
          var walink = 'https://web.whatsapp.com/send',
              phone = '6285960306011', // Ganti dengan nomor WhatsApp Anda
              walink2 = 'Halo, saya ingin membeli produk anda dengan keterangan berikut:\n\n';

          // Dukungan Smartphone
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
              var walink = 'whatsapp://send';
          }

          // Formulir Input Panggilan
          var input_nama = $("#wa_nama").val(),
              input_email = $("#wa_email").val(),
              input_namaBlog = $("#wa_blog").val(),
              input_urlBlog = $("#wa_url").val(),
              input_alamat = $("#wa_alamat").val(),
              input_lisensi = $("#wa_lisensi :selected").text(),
              input_pembayaran = $("#wa_pembayaran :selected").text(),
              input_namaproduk = $("#nama_produk").text(),
              input_viaUrl = location.href;

          // URL Final WhatsApp
          var samuelpasaribu_whatsapp = walink + '?phone=' + phone + '&text=' + encodeURIComponent(walink2 +
              '*DATA SAYA*\n' +
              '=======================\n' +
              '*Nama* : ' + input_nama + '\n' +
              '*Email* : ' + input_email + '\n' +
              '*Total Pembayaran* : IDR.' + input_namaBlog + '\n' +
              '*URL Blog* : ' + input_urlBlog + '\n' +
              '*Lokasi* : ' + input_alamat + '\n' +
              '*Metode Pembayaran* : ' + input_pembayaran + '\n' +
              '=======================\n\n' +
              '*DAFTAR BELANJAAN*\n' +
              '=======================\n' +
              '*Nama Produk* : ' + input_namaproduk + '\n' +
              '*Jenis Lisensi* : ' + input_lisensi + '\n' +
              '*Link Produk* : ' + input_viaUrl + '\n' +
              '=======================');

          // Buka Jendela WhatsApp
          window.open(samuelpasaribu_whatsapp, '_blank');
          window.location.href = input_viaUrl;
          return false;
      }
  });

  // Fungsi untuk mereset form
  $('.reset_form').click(function() {
      $('#order-form')[0].reset();
      $('#wa_lisensi, #wa_pembayaran').val('default');
      $('.samuelpasaribu-input-field .validate').removeClass('focus');
      $('.samuelpasaribu-input-field .samuelpasaribu-validasi').removeClass('show');
  });
var currentProductName = null;
var currentProductPrice = null;

function updateWidgetInfo() {
    var productNameElement = document.getElementById("nama-produk-widget1");
    var productPriceElement = document.getElementById("harga-produk-widget1");

    var postProductName = document.querySelector(".post-body .nama-produk");
    var postProductPrice = document.querySelector(".post-body .harga-produk");

    if (postProductName && postProductPrice) {
        var productName = postProductName.textContent;
        var productPrice = parseFloat(postProductPrice.getAttribute("data-harga"));

        productNameElement.textContent = productName;
        productPriceElement.textContent = "IDR " + productPrice.toLocaleString();
        productPriceElement.setAttribute("data-harga", productPrice);

        currentProductName = productName;
        currentProductPrice = productPrice;
    } else {
        productNameElement.textContent = "No Product";
        productPriceElement.textContent = "IDR 0,00";
        currentProductName = null;
        currentProductPrice = null;
    }
}

function addToCartFromWidget() {
    var quantity = parseInt(document.getElementById("quantity").value);

    if (!isNaN(quantity) && quantity > 0) {
        if (currentProductName !== null && currentProductPrice !== null) {
            for (var i = 0; i < quantity; i++) {
                addToCart(currentProductName, currentProductPrice);
            }
            alert("Produk ditambahkan ke keranjang sebanyak " + quantity + " buah!");
        } else {
            alert("Silakan buka postingan terlebih dahulu untuk melihat informasi produk.");
        }
    } else {
        alert("Silakan masukkan jumlah produk yang valid.");
    }
}

window.addEventListener("load", updateWidgetInfo);

function decreaseQuantity() {
    var quantityInput = document.getElementById("quantity");
    var currentValue = parseInt(quantityInput.value, 10);

    if (!isNaN(currentValue) && currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function increaseQuantity() {
    var quantityInput = document.getElementById("quantity");
    var currentValue = parseInt(quantityInput.value, 10);

    if (!isNaN(currentValue)) {
        quantityInput.value = currentValue + 1;
    }
}
const targetDomain = 'haxortema.blogspot.com';

function createAlertBox(message) {
  const alertBox = document.createElement('div');
  alertBox.setAttribute('id', 'alertBox');
  alertBox.style.position = 'fixed';
  alertBox.style.top = '50px';
  alertBox.style.left = '50%';
  alertBox.style.transform = 'translateX(-50%)';
  alertBox.style.backgroundColor = '#f2f2f2';
  alertBox.style.border = '1px solid #ddd';
  alertBox.style.borderRadius = '5px';
  alertBox.style.padding = '20px';
  alertBox.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  alertBox.style.zIndex = '9999';
  alertBox.innerHTML = `<strong>PERINGATAN!</strong> ${message}`;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    document.body.removeChild(alertBox);
    window.location.href = 'https://haxortema.blogspot.com';
  }, 10000);
}

const currentDomain = window.location.hostname;

if (currentDomain !== targetDomain) {
  createAlertBox('Sumber Daya Ini Diamankan Oleh Ahli Keamanan. Dilarang Mengakses Tanpa Izin.');
}
