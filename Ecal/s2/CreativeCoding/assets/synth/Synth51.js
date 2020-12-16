const Synth51 = {

  counter: 1,

  song(time) {

    if (this.counter % 1== 0) {
      this.drumMachine.triggerAttackRelease('C1', '4n', time, 1);
      console.log(this.counter);
    }
    this.counter++;
  },

  init() {
    console.log('hey2')
    this.drumMachine = new Tone.MembraneSynth().toMaster();
    this.loopBeat = new Tone.Loop(this.song.bind(this), '4n');

    this.synth = new Tone.Synth().toMaster()
    this.synth.triggerAttackRelease('C4', '8n')

  }
}