(function () {

    var changeSectionTitleFontColor = function (color) {
        var all = document.getElementsByClassName('section_title');
        for (var i = 0; i < all.length; i++) {
            all[i].style.color = color;
        }
    }

    var openFileSelectWindow = function (accept, multy = false, callback) {
        var inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.accept = accept; // Note Edge does not support this attribute
        if (multy) {
            inputElement.multiple = multy;
        }
        if (typeof callback === "function") {
            inputElement.addEventListener("change", callback);
        }
        inputElement.dispatchEvent(new MouseEvent("click"));
    }

    var downloadJsonFile = function (content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    var getSectionValueByName = function (sectionId) {
        return document.querySelector('#' + sectionId + ' > div.section_editable').innerText;
    };

    var setSectionValueByName = function (sectionId, innerValue) {
        document.querySelector('#' + sectionId + ' > div.section_editable').innerText = innerValue;
    };

    window.onbeforeunload = function (e) {
        return 'Reload site?';
    };

    document.getElementById('btn_print').onclick = function () {
        ga('send', {
            hitType: 'event',
            eventCategory: 'Export',
            eventAction: 'WebPrint',
            eventLabel: 'Print lean canvas in browser'
        });

        window.print();
    };

    document.getElementById('btn_exportAsImage').onclick = function () {
        html2canvas(document.getElementById('lean_canvas'),
            {
                onrendered: function (canvas) {
                    var a = document.createElement('a');
                    a.href = canvas.toDataURL("image/png");
                    a.download = 'lean_canvas.jpg';
                    a.click();
                }
            });

        ga('send', {
            hitType: 'event',
            eventCategory: 'Export',
            eventAction: 'ExportAsImage',
            eventLabel: 'Export lean canvas as image'
        });
    };

    document.getElementById('btn_save').onclick = function () {
        var filename = prompt("Please enter the file name to save");
        if (filename == '' || filename == null) {
            return false;
        }
        var saveObj = {
            problem: getSectionValueByName('section_problem'),
            existing_alt: getSectionValueByName('section_existing_alt'),
            solution: getSectionValueByName('section_solution'),
            key_metrics: getSectionValueByName('section_key_metrics'),
            uvp: getSectionValueByName('section_uvp'),
            high_level_concept: getSectionValueByName('section_high_level_concept'),
            unfair_adv: getSectionValueByName('section_unfair_adv'),
            channels: getSectionValueByName('section_channels'),
            customer_segments: getSectionValueByName('section_customer_seg'),
            early_adopters: getSectionValueByName('section_early_adopters'),
            cost_structure: getSectionValueByName('section_cost_struct'),
            revenue_streams: getSectionValueByName('section_rev_streams')
        };
        downloadJsonFile(JSON.stringify(saveObj), filename + '.leancanvas', 'text/plain');
    };

    document.getElementById('btn_open').onclick = function () {
        openFileSelectWindow(".leancanvas", false, function (event) {
            [...this.files].forEach(file => {
                document.getElementById('filename').innerHTML = '<i class="fas fa-file-alt"></i> <b>' + file.name + '</b>';
                var reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = readerEvent => {
                    var content = readerEvent.target.result; // this is the content!
                    var openObj = JSON.parse(content);
                    setSectionValueByName('section_problem', openObj.problem);
                    setSectionValueByName('section_existing_alt', openObj.existing_alt);
                    setSectionValueByName('section_solution', openObj.solution);
                    setSectionValueByName('section_key_metrics', openObj.key_metrics);
                    setSectionValueByName('section_uvp', openObj.uvp);
                    setSectionValueByName('section_high_level_concept', openObj.high_level_concept);
                    setSectionValueByName('section_high_level_concept', openObj.unfair_adv);
                    setSectionValueByName('section_channels', openObj.channels);
                    setSectionValueByName('section_customer_seg', openObj.customer_segments);
                    setSectionValueByName('section_early_adopters', openObj.early_adopters);
                    setSectionValueByName('section_cost_struct', openObj.cost_structure);
                    setSectionValueByName('section_rev_streams', openObj.revenue_streams);
                }
            });
        });
    };

    document.getElementById('color_black').onclick = function () {
        changeSectionTitleFontColor('black');
    }

    document.getElementById('color_red').onclick = function () {
        changeSectionTitleFontColor('#ef7a7a');
    }

    document.getElementById('color_blue').onclick = function () {
        changeSectionTitleFontColor('#7a9def');
    }

    document.getElementById('color_green').onclick = function () {
        changeSectionTitleFontColor('#64BE64');
    }
})()