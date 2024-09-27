document.addEventListener('DOMContentLoaded', function() {
    // Membuat elemen form
    const form = document.createElement('form');
    form.id = 'formMahasiswa';
    document.body.appendChild(form);

    // Menambahkan judul form
    const judul = document.createElement('h2');
    judul.textContent = 'Form Kuis';
    form.appendChild(judul);

    // Fungsi untuk membuat elemen input dengan label
    function createInputWithLabel(type, id, name, labelText) {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        
        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = labelText;
        
        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.name = name;
        input.required = true;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        return wrapper;
    }

    // DOM 1: Membuat input nama
    form.appendChild(createInputWithLabel('text', 'nama', 'nama', 'Nama :'));

    // DOM 2: Membuat input NIM
    form.appendChild(createInputWithLabel('text', 'nim', 'nim', 'NIM :'));

    // DOM 3: Membuat select program studi
    const prodiWrapper = document.createElement('div');
    prodiWrapper.className = 'input-wrapper';
    const prodiLabel = document.createElement('label');
    prodiLabel.htmlFor = 'prodi';
    prodiLabel.textContent = 'Program Studi :';
    const prodi = document.createElement('select');
    prodi.id = 'prodi';
    prodi.name = 'prodi';
    prodi.required = true;

    // Membuat opsi untuk dropdown program studi
    const options = ['Pilih Program Studi', 'Logistik Kelautan', 'Sistem Informasi Kelautan', 'PGSD'];
    options.forEach((opt, index) => {
        const option = document.createElement('option');
        option.value = index === 0 ? '' : opt;
        option.textContent = opt;
        prodi.appendChild(option);
    });

    prodiWrapper.appendChild(prodiLabel);
    prodiWrapper.appendChild(prodi);
    form.appendChild(prodiWrapper);

    // Tambahan: Elemen untuk notifikasi program studi
    const notifikasi = document.createElement('div');
    notifikasi.id = 'notifikasi';
    notifikasi.style.marginTop = '10px';
    form.appendChild(notifikasi);

    // DOM 4: Membuat radio button jenis kelamin
    const jkWrapper = document.createElement('div');
    jkWrapper.className = 'input-wrapper';
    const jkLabel = document.createElement('label');
    jkLabel.textContent = 'Jenis Kelamin :';
    jkWrapper.appendChild(jkLabel);
    ['Laki-laki', 'Perempuan'].forEach(jk => {
        const label = document.createElement('label');
        label.className = 'radio-label';
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'jenisKelamin';
        radio.value = jk;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(jk));
        jkWrapper.appendChild(label);
    });
    form.appendChild(jkWrapper);

    // DOM 5: Membuat checkbox hobi
    const hobiWrapper = document.createElement('div');
    hobiWrapper.className = 'input-wrapper';
    const hobiLabel = document.createElement('label');
    hobiLabel.textContent = 'Hobi :';
    hobiWrapper.appendChild(hobiLabel);
    ['Berenang', 'Memasak', 'dll.'].forEach(hobi => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'hobi';
        checkbox.value = hobi;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(hobi));
        hobiWrapper.appendChild(label);
        
        // Event untuk mengubah warna latar belakang checkbox hobi saat dipilih
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                hobiWrapper.style.backgroundColor = '#e6ffe6'; // Mengubah warna latar jika checkbox dipilih
            } else {
                // Cek jika tidak ada checkbox yang terpilih
                const anyChecked = Array.from(hobiWrapper.querySelectorAll('input[type="checkbox"]')).some(checkbox => checkbox.checked);
                hobiWrapper.style.backgroundColor = anyChecked ? '#e6ffe6' : ''; // Kembalikan warna jika tidak ada yang terpilih
            }
        });
    });
    form.appendChild(hobiWrapper);

    // Membuat tombol submit
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Kirim';
    form.appendChild(submitBtn);

    // Event 1: Form submit
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form dikirim secara default
        tampilkanHasil(); // Memanggil fungsi untuk menampilkan hasil
    });

    // Event 2: Input pada nama
    document.getElementById('nama').addEventListener('input', function() {
        this.value = this.value.replace(/[0-9]/g, ''); // Menghapus semua angka dari input
    });

    // Event 3: Input pada NIM
    document.getElementById('nim').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, ''); // Menghapus semua karakter bukan angka
    });

    // Event 4: Perubahan pada dropdown program studi
    prodi.addEventListener('change', function() {
        if (this.value === '') {
            this.setCustomValidity('Silakan pilih program studi');
            notifikasi.textContent = ''; // Kosongkan notifikasi
        } else {
            this.setCustomValidity('');
            notifikasi.textContent = 'Anda memilih program studi: ' + this.value; // Menampilkan notifikasi

            // Menampilkan alert khusus untuk program studi tertentu
            if (this.value === 'Logistik Kelautan') {
                alert('Anda memilih Logistik Kelautan, bidang yang menarik!');
            } else if (this.value === 'Sistem Informasi Kelautan') {
                alert('Anda memilih Sistem Informasi Kelautan, selamat datang di dunia teknologi!');
            }
        }
        
        // Mengubah warna background berdasarkan program studi
        switch(this.value) {
            case 'Logistik Kelautan':
                this.style.backgroundColor = '#e6f7ff';
                break;
            case 'Sistem Informasi Kelautan':
                this.style.backgroundColor = '#e6ffe6';
                break;
            case 'PGSD':
                this.style.backgroundColor = '#fff0e6';
                break;
            default:
                this.style.backgroundColor = '';
        }
    });

    // Event 5: Hover pada tombol submit
    submitBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#45a049'; // Mengubah warna latar saat kursor di atas tombol
    });
    submitBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = ''; // Mengembalikan warna latar saat kursor meninggalkan tombol
    });

    // Event 6: Focus pada input NIM
    document.getElementById('nim').addEventListener('focus', function() {
        console.log('Input NIM sedang difokuskan');
    });

    // Event 7: Blur pada input nama
    document.getElementById('nama').addEventListener('blur', function() {
        console.log('Input Nama kehilangan fokus');
    });

    // Event 8: Keydown pada input nama
    document.getElementById('nama').addEventListener('keydown', function(event) {
        console.log(`Key ditekan pada input nama: ${event.key}`);
    });

    // Event 9: Keyup pada input NIM
    document.getElementById('nim').addEventListener('keyup', function(event) {
        console.log(`Key dilepaskan pada input NIM: ${event.key}`);
    });

    // Event 10: Input pada checkbox hobi
    const checkboxes = document.querySelectorAll('input[name="hobi"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedHobbies = Array.from(checkboxes)
                .filter(i => i.checked)
                .map(i => i.value);
            console.log('Hobi yang dipilih:', checkedHobbies.join(', '));
        });
    });

    // Event 11: Perubahan pada form untuk menampilkan pemberitahuan jika semua field terisi
    form.addEventListener('input', function() {
        const isComplete = [...form.elements].every(input => input.checkValidity());
        if (isComplete) {
            alert('Semua field telah diisi dengan benar!');
        }
    });

    // Fungsi untuk menampilkan hasil input form
    function tampilkanHasil() {
        alert('Form telah disubmit!');
    }
});
