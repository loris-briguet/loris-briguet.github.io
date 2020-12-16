'use strict';

let DEBUG_MODE = false;

let NODES = {};
let WORDS = [];
let SYNTH;

let TXT = {};

let allWords = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85, 91, 92, 93, 94, 95, 101, 102, 103, 104, 105, 111, 112, 113, 114, 115];

let f

function preload() {

    const directory = "assets/text/";
    const extension = ".txt";
    f = loadFont('font/VG5000-Regular.otf')

    for (let i = 0; i < allWords.length; i++) {
        let id = allWords[i];
        TXT[id] = loadStrings(directory + id + extension);
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



function setup() {
    SYNTH = new Synth11

    for (let i = 0; i < allWords.length; i++) {
        let id = allWords[i];
        SYNTH.txt = TXT[id]
        let selector = `div[id="${id}"]`;
        allWords[i] = TXT[id][0].split(' ');
        addNode(selector, SYNTH);
    }


    createCanvas(windowWidth, windowHeight)
    background(0);



    window.addEventListener('scroll', function (event) {

        for (let selector in NODES) {
            let node = NODES[selector];
            updateState(node);
        }
    });
};


function addNode(selector, synth) {

    let elem = document.querySelector(selector);
    let cityElem = elem.querySelector('.cityinfos');

    let node = {
        elem,
        cityElem,
        synth,
        isVisible: false,
    }

    NODES[selector] = node;
    updateState(node);

    // let textToPrint = node.synth.words[0].toString()
    // debugConsole(textToPrint)
    // draw(textToPrint);
}

function updateState(node) {
    let isVisible = isInViewport(node.cityElem);

    if (node.isVisible !== isVisible) {


        //let amSynth = node.synth.amSynth;
        let notes = node.synth.notes;
        let chords = node.synth.chords;
        let cityInfos = node.cityElem.textContent.split(', ');
        let cityTypeNum = cityInfos[1].split(' ');
        let cityType = cityTypeNum.slice(0, -1).join(' ');
        WORDS = node.synth.words;
        // let text = node.synth.text;
        let analysis = []
        let elemId;

        if (isVisible) {

            function cityAnalysis(analysis) {
                debugConsole(analysis);
                if (analysis[0]) {
                    if (analysis[0] == 'civilisation') {
                        node.synth.wave = "sawtooth"
                        node.synth.attack = 0.01
                        node.synth.multiplier = 2
                        node.synth.noiseColor = 'brown'
                    } else if (analysis[0] == 'Memory') {
                        node.synth.wave = "sine"
                        node.synth.attack = 0.7
                        node.synth.multiplier = 4
                        node.synth.noiseColor = 'white'
                    } else if (analysis[0] == 'Storytelling') {
                        node.synth.wave = "square"
                        node.synth.attack = 0.2
                        node.synth.multiplier = 3
                        node.synth.noiseColor = 'pink'
                    } else if (analysis[0] == 'modernity') {
                        node.synth.wave = "triangle"
                        node.synth.attack = 0.5
                        node.synth.multiplier = 1.5
                        node.synth.noiseColor = 'brown'
                    }
                }
                if (analysis[1]) {
                    if (analysis[1] == 'civilisation') {
                        node.synth.filterType = 'highpass'
                        node.synth.filterValue = 400
                        node.synth.divider = 50
                    } else if (analysis[1] == 'Memory') {
                        node.synth.filterType = 'lowpass'
                        node.synth.filterValue = 100
                        node.synth.divider = 100
                    } else if (analysis[1] == 'Storytelling') {
                        node.synth.filterType = 'lowpass'
                        node.synth.filterValue = 400
                        node.synth.divider = 500
                    } else if (analysis[1] == 'modernity') {
                        node.synth.filterType = 'highpass'
                        node.synth.filterValue = 100
                        node.synth.multiplier = 1.5
                        node.synth.divider = 1000
                    }
                }
            }

            function chapterAnalysis() {
                if (cityInfos[0] == 'Chapter I') {
                    node.synth.delay = '2n'
                } else if (cityInfos[0] == 'Chapter II') {
                    node.synth.delay = '4n'
                } else if (cityInfos[0] == 'Chapter III') {
                    node.synth.delay = '6n'
                } else if (cityInfos[0] == 'Chapter IV') {
                    node.synth.delay = '8n'
                } else if (cityInfos[0] == 'Chapter V') {
                    node.synth.delay = '10n'
                } else if (cityInfos[0] == 'Chapter VI') {
                    node.synth.delay = '12n'
                } else if (cityInfos[0] == 'Chapter VII') {
                    node.synth.delay = '14n'
                } else if (cityInfos[0] == 'Chapter VIII') {
                    node.synth.delay = '16n'
                } else if (cityInfos[0] == 'Chapter IX') {
                    node.synth.delay = '18n'
                }
            }

            function chordsAnndNotes() {

                switch (cityType) {
                    case 'Cities & Memory':
                        notes.push('A3', 'A3', 'F#3', 'F#3', 'C#3', 'C#3', 'D3', 'D3');
                        chords.push(
                            'A3', 'C#3', 'E3',
                            'F#3', 'A3', 'C#3',
                            'C#3', 'E3', 'G#3',
                            'D3', 'F#3', 'A3');
                        break;
                    case 'Cities & Desire':
                        notes.push('C#3', 'C#3', 'G#3', 'G#3', 'C#3', 'C#3', 'D#3', 'D#3');
                        chords.push(
                            'C#3', 'E3', 'G#3',
                            'G#3', 'B3', 'D#3',
                            'C#3', 'E3', 'G#3',
                            'D#3', 'F#3', 'A#3');
                    case 'Cities & Signs':
                        notes.push('E3', 'E3', 'A3', 'A3', 'E3', 'E3', 'B3', 'B3');
                        chords.push(
                            'E3', 'G#3', 'B3',
                            'A3', 'C#3', 'E3',
                            'E3', 'G#3', 'B3',
                            'B3', 'D#3', 'F#3');

                        break;
                    case 'Thin Cities':
                        notes.push('F3', 'F3', 'Bb3', 'Bb3', 'Ab3', 'Ab3', 'Db3', 'Db3');
                        chords.push(
                            'F3', 'G#3', 'C3',
                            'Bb3', 'C#3', 'F3',
                            'Ab3', 'C3', 'D#3',
                            'Db3', 'F3', 'G#3');
                        break;
                    case 'Trading Cities':
                        notes.push('A3', 'A3', 'D3', 'D3', 'E3', 'E3', 'E3', 'E3');
                        chords.push(
                            'A3', 'C3', 'E3',
                            'D3', 'F3', 'A3',
                            'E3', 'G3', 'B3',
                            'E3', 'G3', 'B3');

                        break;
                    case 'Cities & Eyes':
                        notes.push('B3', 'B3', 'B3', 'B3', 'E3', 'E3', 'G3', 'G3');
                        chords.push(
                            'B3', 'D3', 'F#3',
                            'B3', 'D3', 'F#3',
                            'E3', 'G3', 'B3',
                            'G3', 'B3', 'D3');

                        break;
                    case 'Cities & Names':
                        notes.push('A3', 'A3', 'F3', 'F3', 'C3', 'C3', 'G3', 'G3');
                        chords.push(
                            'A3', 'C#3', 'E3',
                            'F3', 'A3', 'C3',
                            'C3', 'E3', 'G3',
                            'G3', 'B3', 'D3');

                        break;
                    case 'Cities & the Dead':
                        notes.push('G3', 'G3', 'D3', 'D3', 'Bb3', 'Bb3', 'A3', 'A3');
                        chords.push(
                            'G3', 'A#3', 'D3',
                            'D3', 'F3', 'A3',
                            'Bb3', 'D3', 'F3',
                            'A3', 'C3', 'E3');

                        break;
                    case 'Cities & the Sky':
                        notes.push('B3', 'B3', 'G3', 'G3', 'E3', 'E3', 'F#3', 'F#3');
                        chords.push(
                            'A3', 'D3', 'F#3',
                            'G3', 'B3', 'D3',
                            'E3', 'G3', 'B3',
                            'F#3', 'A3', 'C#3');

                        break;
                    case 'Continuous Cities':
                        notes.push('F#3', 'F#3', 'B3', 'B3', 'G3', 'G3', 'A3', 'A3');
                        chords.push(
                            'F#3', 'A3', 'C3',
                            'B3', 'D3', 'F#3',
                            'G3', 'B3', 'D3',
                            'A3', 'C3', 'E3');

                        break;
                    case 'Hidden Cities':
                        notes.push('F#3', 'F#3', 'E3', 'E3', 'A3', 'A3', 'G3', 'G3');
                        chords.push(
                            'F#3', 'A3', 'C#3',
                            'E3', 'G3', 'B3',
                            'A3', 'C#3', 'E3',
                            'G3', 'B3', 'D3');

                        break;
                }
            }

            function getText(elemId) {
                let curText = TXT[elemId];
                node.synth.txt.push(curText[0]);

                let toIndex;

                if (elemId.length == 2) {
                    toIndex = (5 * elemId[0]) + 6
                } else if (elemId.length == 3) {
                    indexOver100 = "1" + elemId[1];
                    toIndex = (5 * indexOver100) + 6
                }
                node.synth.words.push(allWords[elemId - toIndex])

            }

            function startSynth(elemId) {

                let toIndex;

                if (elemId.length == 2) {
                    toIndex = (5 * elemId[0]) + 6
                } else if (elemId.length == 3) {
                    indexOver100 = "1" + elemId[1];
                    toIndex = (5 * indexOver100) + 6
                }
                node.synth.loopBeat.start(0);
                Tone.Transport.bpm.value = Math.floor(60);
                debugConsole(Tone.Transport.bpm.value)
                debugConsole(allWords[elemId - toIndex])
                Tone.Transport.start();
            }


            switch (node.elem.id) {
                case '11':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '12':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '13':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '14':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '15':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '21':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '22':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '23':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '24':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '25':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '31':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '32':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '33':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '34':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '35':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '41':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '42':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '43':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '44':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '45':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '51':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '52':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '53':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '54':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '55':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '61':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '62':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '63':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '64':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '65':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '71':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '72':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '73':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '74':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '75':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '81':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '82':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '83':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '84':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '85':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'Storytelling']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '91':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '92':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '93':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '94':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '95':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '101':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '102':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '103':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '104':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '105':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Memory', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '111':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation', 'modernity']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '112':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '113':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '114':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
                case '115':
                    chapterAnalysis();
                    chordsAnndNotes();
                    analysis = ['Storytelling', 'civilisation']
                    cityAnalysis(analysis);
                    node.synth.init();
                    elemId = node.elem.id;
                    getText(elemId)
                    startSynth(elemId)
                    break;
            }
        } else {
            node.synth.stop();
            CHARS = '';
        }

        node.isVisible = isVisible;
    }
}


function isInViewport(elem) {
    let bounding = elem.getBoundingClientRect();

    return (
        bounding.top >= 0 && bounding.bottom <= (window.innerHeight)
    );
}

let CHARS = '';
let OLD_COUNTER = undefined;

function draw() {
    background(0)
    fill(120)
    noStroke()
    let counter = SYNTH.counter
    let textArray = []
    let wordArray = []
    let firstLetter = []
    let drums;

    debugConsole(counter);
    if (SYNTH.txt.length > 0) {

        textArray = (SYNTH.txt[0] || '').split('');
        wordArray = (SYNTH.txt[0] || '').split(' ');


    }

    if (textArray.length > 0 && wordArray.length > 0) {

        let char = textArray[counter];

        if (char !== undefined && OLD_COUNTER !== counter) {
            OLD_COUNTER = counter;
            CHARS += char;
        }

        if (char === ' ') {
            CHARS = '';
        }

        if (counter >= 0) {
            if (counter > 1 && ['e', 't', 'a', 'r', 'i', 'n', 'o', 's', 'E', 'T', 'A', 'R', 'I', 'N', 'O', 'S'].includes(wordArray[counter - 1][0])) {
                firstLetter = wordArray[counter - 1]
            } else {
                firstLetter = []
            }

            if (counter > 1 && ['.', ':', ',', ';', '!', '?'].includes(textArray[counter - 1])) {
                drums = textArray[counter - 1]
            } else {
                drums = ''
            }
      


        fill(255);
        noStroke();
        textLeading(15);
        textSize(30);
        textFont(f)
        textAlign(RIGHT, CENTER);
        text('Chords: \n Notes: \n Drums: ', width / 2, height / 2 + height / 4);
        textAlign(LEFT, CENTER);
        text(CHARS + "\n" + firstLetter + "\n" + drums, width / 2, height / 2 + height / 4);
    }
    }
}


function debugConsole() {
    if (DEBUG_MODE)
        console.log(...arguments);
}