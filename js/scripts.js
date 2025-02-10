$(document).ready(function () {
            // Ambil tema dari localStorage jika ada, jika tidak, default ke 'light'
            const theme = localStorage.getItem('theme') || 'light';
            $("#theme-select").val(theme); // Set nilai dropdown sesuai tema yang diambil

            // Terapkan tema berdasarkan nilai dari localStorage
            if (theme === "dark") {
                // Jika tema gelap, ubah warna latar belakang dan teks
                $("body").css("background-color", "#333");
                $("body").css("color", "#fff");
                $(".modal-content").css("background-color", "#333");
                $(".modal-content").css("color", "#fff");
                $(".footer").removeClass("btn-outline-dark").addClass("btn-outline-light");
                $(".game-arena").removeClass("bg-warning-subtle").addClass("bg-secondary");
            } else {
                // Jika tema terang, ubah warna latar belakang dan teks
                $("body").css("background-color", "#fff");
                $("body").css("color", "#000");
                $(".modal-content").css("background-color", "#fff");
                $(".modal-content").css("color", "#000");
                $(".footer").addClass("btn-outline-dark").removeClass("btn-outline-light");
                $(".game-arena").addClass("bg-warning-subtle").removeClass("bg-secondary");
            }

            // Menangani perubahan tema saat dropdown berubah
            $("#theme-select").on("change", function () {
                const selectedTheme = $(this).val(); // Ambil tema yang dipilih
                localStorage.setItem('theme', selectedTheme); // Simpan pilihan tema ke localStorage

                // Terapkan tema sesuai dengan pilihan
                if (selectedTheme === "dark") {
                    $("body").css("background-color", "#333");
                    $("body").css("color", "#fff");
                    $(".modal-content").css("background-color", "#333");
                    $(".modal-content").css("color", "#fff");
                    $(".footer").removeClass("btn-outline-dark").addClass("btn-outline-light");
                    $(".game-arena").removeClass("bg-warning-subtle").addClass("bg-secondary");
                } else {
                    $("body").css("background-color", "#fff");
                    $("body").css("color", "#000");
                    $(".modal-content").css("background-color", "#fff");
                    $(".modal-content").css("color", "#000");
                    $(".footer").addClass("btn-outline-dark").removeClass("btn-outline-light");
                    $(".game-arena").addClass("bg-warning-subtle").removeClass("bg-secondary");
                }
            });

            // Sembunyikan elemen gameplay pada awalnya
            $(".gameplay").hide();

            // Menangani klik tombol kembali
            $(".kembali").on("click", function () {
                $(".gameplay").hide(); // Sembunyikan gameplay
                $(".menu-utama").show(); // Tampilkan menu utama
                $(".judul").text("Pilih Karakter Vtuber"); // Ubah judul
            });

            // Fungsi untuk mengatur permainan dengan karakter dan musik tertentu
            function setupGame(character, musicList, localStorageKey) {
                $(".menu-utama").hide(); // Sembunyikan menu utama
                $(".judul").text("Kurunya telah dipencet sebanyak"); // Ubah judul
                $(".gameplay").show(); // Tampilkan elemen gameplay

                // Ambil jumlah dari localStorage atau set ke 0 jika belum ada
                let count = localStorage.getItem(localStorageKey) ? parseInt(localStorage.getItem(localStorageKey)) : 0;
                $('#counter').text(count); // Tampilkan jumlah saat ini

                // Fungsi untuk mendapatkan musik secara acak dari daftar
                function getRandomMusic() {
                    return musicList[Math.floor(Math.random() * musicList.length)];
                }

                // Menangani klik tombol increment
                $('#increment-btn').off('click').on('click', function () {
                    count++; // Tambah hitungan
                    $('#counter').text(count); // Perbarui tampilan hitungan
                    localStorage.setItem(localStorageKey, count); // Simpan hitungan baru ke localStorage

                    // Tambahkan gambar karakter ke elemen #character
                    let $img = $('<img class="image" src="aset/img/' + character + '.gif">');
                    $('#character').append($img);
                    // Animasi gambar karakter bergerak ke kanan
                    $img.animate({ right: '100%' }, 2000, function () {
                        $(this).remove(); // Hapus gambar setelah animasi selesai
                    });

                    // Dapatkan musik acak dan ubah teks tombol berdasarkan musik
                    let randomMusic = getRandomMusic();
                    let buttonText;

                    if (randomMusic.includes('kuru.mp3')) {
                        buttonText = 'Kuru Kuru';
                    } else if (randomMusic.includes('kururin.mp3')) {
                        buttonText = 'Kururin';
                    } else if (randomMusic.includes('kira.mp3')) {
                        buttonText = 'Kira Kira';
                    }

                    $('#increment-btn').text(buttonText); // Perbarui teks tombol
                    new Audio(randomMusic).play(); // Mainkan musik acak
                });

                // Menangani klik tombol reset
                $(".reset-count").on("click", function () {
                    // Tampilkan konfirmasi sebelum mereset
                    Swal.fire({
                        title: "Apa Kamu Yakin?",
                        text: "Kamu akan mereset progresmu dan tidak akan bisa mengembalikannya lagi!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yakin!",
                        cancelButtonText: "Batal"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.setItem(localStorageKey, 0); // Reset hitungan di localStorage
                            count = 0; // Set hitungan ke 0
                            $('#counter').text(0); // Perbarui tampilan hitungan
                            Swal.fire({
                                title: "Tereset!",
                                text: "Progresmu berhasil direset.",
                                icon: "success"
                            });
                        }
                    });
                });
            }

            // Menangani klik tombol untuk memulai permainan dengan karakter tertentu
            $(".play-kobo").on("click", function () {
                setupGame('kobo', [
                    'aset/audio/kobo/kobo-kira.mp3',
                    'aset/audio/kobo/kobo-kuru.mp3',
                    'aset/audio/kobo/kobo-kururin.mp3'
                ], 'kobocount'); // Panggil setupGame untuk karakter 'kobo'
            });

            $(".play-zeta").on("click", function () {
                setupGame('zeta', [
                    'aset/audio/zeta/zeta-kuru.mp3',
                    'aset/audio/zeta/zeta-kururin.mp3'
                ], 'zetacount'); // Panggil setupGame untuk karakter 'zeta'
            });

            $(".play-kaela").on("click", function () {
                setupGame('kaela', [
                    'aset/audio/kaela/kaela-kuru.mp3',
                    'aset/audio/kaela/kaela-kururin.mp3'
                ], 'kaelacount'); // Panggil setupGame untuk karakter 'kaela'
            });
        });