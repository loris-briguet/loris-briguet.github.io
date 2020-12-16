class Synth11 {

    constructor(options) {

        this.defaults = {

            counter: -1,
            counterDiv4: 1,
            notes: [],
            chords: [],
            words: [],
            txt: [],
            delay: '8n',
            wave: 'square',
            attack: 0.01,
            multiplier: 4,
            divider: 1000,
            filterType: 'lowpass',
            filterValue: 200,
            noiseColor: 'brown',
        }

        Object.assign(this, this.defaults, options);
    }

    song(time) {

        if (this.counter > this.defaults.counter) {
            this.firstLetter = this.words[0][this.counter][0];
            this.allLetters = this.txt[0].split('');
            this.currLetter = this.allLetters[this.counter]

            if (this.counter % 4 == 0) {
                this.counterDiv4++
            }

            ///first letter Plays Note
            if (this.firstLetter == 'E' || this.firstLetter == 'e') {
                this.letterNote.triggerAttackRelease(this.notes[0], '32n', time, .9);
            } else if (this.firstLetter == 'T' || this.firstLetter == 't') {
                this.letterNote.triggerAttackRelease(this.notes[1], '32n', time, .9);
            } else if (this.firstLetter == 'A' || this.firstLetter == 'a') {
                this.letterNote.triggerAttackRelease(this.notes[2], '32n', time, .9);
            } else if (this.firstLetter == 'N' || this.firstLetter == 'n') {
                this.letterNote.triggerAttackRelease(this.notes[3], '32n', time, .9);
            } else if (this.firstLetter == 'R' || this.firstLetter == 'r') {
                this.letterNote.triggerAttackRelease(this.notes[4], '32n', time, .9);
            } else if (this.firstLetter == 'I' || this.firstLetter == 'i') {
                this.letterNote.triggerAttackRelease(this.notes[5], '32n', time, .9);
            } else if (this.firstLetter == 'S' || this.firstLetter == 's') {
                this.letterNote.triggerAttackRelease(this.notes[6], '32n', time, .9);
            } else if (this.firstLetter == 'O' || this.firstLetter == 'o') {
                this.letterNote.triggerAttackRelease(this.notes[7], '32n', time, .9);
            } else {}

            ////Ponctuation Plays Drums
            if (this.currLetter == '.' || this.currLetter == '!' || this.currLetter == '?') {
                this.ponctuationDrum.triggerAttackRelease('C1', '4n', time, .5);
            } else if (this.currLetter == ',' || this.currLetter == ':' || this.currLetter == ';') {
                this.ponctuationDrum.triggerAttackRelease('C1', '4n', time, .3);
            } else if (this.currLetter == ' ') {
                this.polySynth.triggerAttackRelease(this.chord, '1m', time, .07);
            } else {}


            //// Sequencer for notes & chords
            this.note = this.notes[this.counter % this.notes.length]
            this.cN1 = this.chords[(this.counterDiv4 % (this.chords.length / 3)) * 3]
            this.cN2 = this.chords[((this.counterDiv4 % (this.chords.length / 3)) * 3) + 1]
            this.cN3 = this.chords[((this.counterDiv4 % (this.chords.length / 3)) * 3) + 2]
            this.chord = [this.cN1, this.cN2, this.cN3]
        }



        if (this.counter == this.words[0].length - 1) {
            this.counter = this.defaults.counter + 1;
        } else {
            this.counter++;
        }

    }

    init() {

        ////effect rack

        this.autoPanner = new Tone.AutoPanner({
            frequency: '' + Math.floor(this.multiplier) + 'n',
            type: this.wave,
            depth: this.multiplier / 8
        }).toMaster().start();

        this.freeverb = new Tone.Freeverb({
            roomSize: this.multiplier / 5.5,
            dampening: 6000
        }).connect(this.autoPanner);

        this.feedbackDelay = new Tone.PingPongDelay({
            delayTime: this.delay,
            maxDelay: this.multiplier * 10
        }).connect(this.freeverb);

        this.phaser = new Tone.Phaser({
            "frequency": 15,
            "octaves": 5,
            "baseFrequency": 1000
        }).connect(this.freeverb);

        this.autoFilter = new Tone.AutoFilter({
            frequency: 1,
            type: 'sine',
            depth: 10,
            baseFrequency: 200,
            octaves: 2.6,
            filter: {
                type: 'lowpass',
                rolloff: -12,
                Q: 1
            }
        }).connect(this.feedbackDelay).start()






        ////synth rack
        this.letterNote = new Tone.AMSynth({
            harmonicity: this.multiplier / 20,
            detune: 0,
            oscillator: {
                type: this.wave
            },
            envelope: {
                attack: this.multiplier / this.divider,
                decay: 0.01,
                sustain: 1,
                release: '4n'
            },
            modulation: {
                type: this.wave
            },
            modulationEnvelope: {
                attack: 0.001,
                decay: 0,
                sustain: 1,
                release: '1m'
            }
        }).connect(this.autoFilter);

        this.ponctuationDrum = new Tone.MembraneSynth().connect(this.freeverb);

        this.polySynth = new Tone.PolySynth(3, Tone.MonoSynth, {
            frequency: this.notes,
            detune: 0,
            oscillator: {
                type: this.wave
            },
            filter: {
                Q: 1,
                type: this.filterType,
                rolloff: -12
            },
            envelope: {
                attack: this.attack,
                decay: 0.1,
                sustain: 0.9,
                release: 1
            },
            filterEnvelope: {
                attack: this.attack * this.multiplier,
                decay: 0.2,
                sustain: 0.8,
                release: 2,
                baseFrequency: this.filterValue,
                octaves: this.multiplier,
                exponent: 2
            }
        }).connect(this.freeverb);
        this.drumMachine = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 10,
            oscillator: {
                type: this.wave
            },
            envelope: {
                attack: 0.001 * this.multiplier,
                decay: 0.4,
                sustain: 0.01,
                release: 1.4 * (this.multiplier / 2),
                attackCurve: 'exponential'
            }
        }).connect(this.feedbackDelay);



        ////Create Noise BackGround
        this.noise = new Tone.Noise(this.noiseColor).start();

        var autoFilter = new Tone.AutoFilter({
            "frequency": "4m",
            "min": 800,
            "max": 10000
        }).connect(Tone.Master);

        this.noise.connect(autoFilter);
        autoFilter.start()
        this.noise.volume.value = -30;

        ////composition rack
        this.loopBeat = new Tone.Loop(this.song.bind(this), '4n');
    }

    stop() {
        console.log('stop');
        this.loopBeat.stop();
        Tone.Transport.stop();
        this.counter = this.defaults.counter;
        this.noise.volume.value = -1000;
        this.words.length = 0;
        this.txt.length = 0;
    }
}