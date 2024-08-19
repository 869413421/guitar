<template>
  <van-row>
    <van-col span="4"></van-col>
    <van-col span="16"><h1>吉他音阶记忆挑战</h1></van-col>
    <van-col span="4"></van-col>
  </van-row>

  <van-row v-if="!challengeStarted">
    <van-col span="4"></van-col>
    <van-col span="16">
      <van-button class="start-button" size="large" type="primary" @click="startChallenge('all')">全指板（12品）
      </van-button>
      <van-button class="start-button" size="large" type="primary" @click="startChallenge('c')">C指型</van-button>
      <van-button class="start-button" size="large" type="primary" @click="startChallenge('a')">A指型</van-button>
      <van-button class="start-button" size="large" type="primary" @click="startChallenge('g')">G指型</van-button>
      <van-button class="start-button" size="large" type="primary" @click="startChallenge('e')">E指型</van-button>
      <van-button class="start-button" size="large" type="primary" @click="startChallenge('d')">D指型</van-button>
    </van-col>
    <van-col span="4"></van-col>
  </van-row>

  <van-row v-if="challengeStarted">
    <van-col span="4"></van-col>
    <van-col span="16">
      <p class="time">
        耗时: {{ elapsedTime }} 秒
      </p>
      <p v-if="currentKey" class="key">
        {{ currentKey }}
      </p>
      <p v-if="inputItem" type="info">
        当前输入： {{ inputItem }}
      </p>
      <p v-if="feedbackMessage">
        {{ feedbackMessage }}
      </p>
      <div style="margin-top: 2vh">
        <van-button class="click-button" size="small" v-if="startType === 'all'" v-for="item in allSoundNames"
                    :key="item" type="primary"
                    @click="userInput(item)">{{ item }}
        </van-button>
        <van-button class="click-button" v-else v-for="item2 in soundNames" :key="item2" type="primary"
                    @click="userInput(item2)">{{ item2 }}
        </van-button>
      </div>
    </van-col>
    <van-col span="4"></van-col>
  </van-row>
</template>

<script >
import {Dialog} from "vant";

export default {
  name: 'App',
  data() {
    return {
      allSoundNames: [
        "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B",
      ],
      soundNames: [
        "C", "D", "E", "F", "G", "A", "B",
      ],
      cGuitarTuning: {
        "一弦三品": "G",
        "一弦一品": "F",
        "一弦空弦": "E",
        "二弦三品": "D",
        "二弦一品": "C",
        "二弦空弦": "B",
        "三弦二品": "A",
        "三弦空弦": "G",
        "四弦三品": "F",
        "四弦二品": "E",
        "四弦空弦": "D",
        "五弦三品": "C",
        "五弦二品": "B",
        "五弦空弦": "A",
        "六弦三品": "G",
        "六弦一品": "F",
        "六弦空弦": "E",
      },
      aGuitarTuning: {
        "六弦三品": "G",
        "六弦五品": "A",
        "五弦二品": "B",
        "五弦三品": "C",
        "五弦五品": "D",
        "四弦二品": "E",
        "四弦三品": "F",
        "四弦五品": "G",
        "三弦二品": "A",
        "三弦四品": "B",
        "三弦五品": "C",
        "二弦三品": "D",
        "二弦五品": "E",
        "二弦六品": "F",
        "一弦三品": "G",
        "一弦五品": "A",
      },
      gGuitarTuning: {
        "六弦五品": "A",
        "六弦七品": "B",
        "六弦八品": "C",
        "五弦五品": "D",
        "五弦七品": "E",
        "五弦八品": "F",
        "四弦五品": "G",
        "四弦七品": "A",
        "三弦四品": "B",
        "三弦五品": "C",
        "三弦七品": "D",
        "二弦五品": "E",
        "二弦六品": "F",
        "二弦八品": "G",
        "一弦五品": "A",
        "一弦七品": "B",
        "一弦八品": "C",
      },
      eGuitarTuning: {
        "六弦七品": "B",
        "六弦八品": "C",
        "六弦十品": "D",
        "五弦七品": "E",
        "五弦八品": "F",
        "五弦十品": "G",
        "四弦七品": "A",
        "四弦九品": "B",
        "四弦十品": "C",
        "三弦七品": "D",
        "三弦九品": "E",
        "三弦十品": "F",
        "二弦八品": "G",
        "二弦十品": "A",
        "一弦七品": "B",
        "一弦八品": "C",
        "一弦十品": "D",
      },
      dGuitarTuning: {
        "六弦十品": "D",
        "六弦十二品": "E",
        "六弦十三品": "F",
        "五弦十品": "G",
        "五弦十二品": "A",
        "四弦九品": "B",
        "四弦十品": "C",
        "四弦十二品": "D",
        "三弦九品": "E",
        "三弦十品": "F",
        "三弦十二品": "G",
        "二弦十品": "A",
        "二弦十二品": "B",
        "二弦十三品": "C",
        "一弦十品": "D",
        "一弦十二品": "E",
        "一弦十三品": "F",
      },
      guitarTuning: {
        "二弦十三品": "C",
        "一弦十三品": "F",
        "六弦十三品": "F",
        "一弦空弦": "E",
        "一弦一品": "F",
        "一弦二品": "F#/Gb",
        "一弦三品": "G",
        "一弦四品": "G#/Ab",
        "一弦五品": "A",
        "一弦六品": "A#/Bb",
        "一弦七品": "B",
        "一弦八品": "C",
        "一弦九品": "C#/Db",
        "一弦十品": "D",
        "一弦十一品": "D#/Eb",
        "一弦十二品": "E",
        "二弦空弦": "B",
        "二弦一品": "C",
        "二弦二品": "C#/Db",
        "二弦三品": "D",
        "二弦四品": "D#/Eb",
        "二弦五品": "E",
        "二弦六品": "F",
        "二弦七品": "F#/Gb",
        "二弦八品": "G",
        "二弦九品": "G#/Ab",
        "二弦十品": "A",
        "二弦十一品": "A#/Bb",
        "二弦十二品": "B",
        "三弦空弦": "G",
        "三弦一品": "G#/Ab",
        "三弦二品": "A",
        "三弦三品": "A#/Bb",
        "三弦四品": "B",
        "三弦五品": "C",
        "三弦六品": "C#/Db",
        "三弦七品": "D",
        "三弦八品": "D#/Eb",
        "三弦九品": "E",
        "三弦十品": "F",
        "三弦十一品": "F#/Gb",
        "三弦十二品": "G",
        "四弦空弦": "D",
        "四弦一品": "D#/Eb",
        "四弦二品": "E",
        "四弦三品": "F",
        "四弦四品": "F#/Gb",
        "四弦五品": "G",
        "四弦六品": "G#/Ab",
        "四弦七品": "A",
        "四弦八品": "A#/Bb",
        "四弦九品": "B",
        "四弦十品": "C",
        "四弦十一品": "C#/Db",
        "四弦十二品": "D",
        "五弦空弦": "A",
        "五弦一品": "A#/Bb",
        "五弦二品": "B",
        "五弦三品": "C",
        "五弦四品": "C#/Db",
        "五弦五品": "D",
        "五弦六品": "D#/Eb",
        "五弦七品": "E",
        "五弦八品": "F",
        "五弦九品": "F#/Gb",
        "五弦十品": "G",
        "五弦十一品": "G#/Ab",
        "五弦十二品": "A",
        "六弦空弦": "E",
        "六弦一品": "F",
        "六弦二品": "F#/Gb",
        "六弦三品": "G",
        "六弦四品": "G#/Ab",
        "六弦五品": "A",
        "六弦六品": "A#/Bb",
        "六弦七品": "B",
        "六弦八品": "C",
        "六弦九品": "C#/Db",
        "六弦十品": "D",
        "六弦十一品": "D#/Eb",
        "六弦十二品": "E"
      },
      gameGuitarTuning: {},
      challengeStarted: false,
      currentKey: '',
      feedbackMessage: '',
      startTime: 0,
      elapsedTime: 0,
      inputItem: "",
      startType: '',
    }
  },
  methods: {
    startChallenge(startType) {
      this.startType = startType
      this.challengeStarted = true;
      switch (startType) {
        case 'all':
          this.gameGuitarTuning = Object.assign({}, this.guitarTuning);
          break;
        case'c':
          this.gameGuitarTuning = Object.assign({}, this.cGuitarTuning);
          break;
        case 'a':
          this.gameGuitarTuning = Object.assign({}, this.aGuitarTuning);
          break;
        case 'g':
          this.gameGuitarTuning = Object.assign({}, this.gGuitarTuning);
          break;
        case 'e':
          this.gameGuitarTuning = Object.assign({}, this.eGuitarTuning);
          break;
        case 'd':
          this.gameGuitarTuning = Object.assign({}, this.dGuitarTuning);
      }
      this.startTime = new Date().getTime();
      this.pickRandomKey();
    },
    pickRandomKey() {
      const keys = Object.keys(this.gameGuitarTuning);

      // 如果没有key了，挑战完成。
      if (keys.length === 0) {
        this.currentKey = '';
        return
      }

      // 随机取出后删除字典里这个key
      const randomIndex = Math.floor(Math.random() * keys.length);
      this.currentKey = keys[randomIndex];
      console.log(this.currentKey)
      delete this.gameGuitarTuning[this.currentKey];
    },
    userInput(keyPressed) {
      this.inputItem = keyPressed;

      if (keyPressed === this.guitarTuning[this.currentKey].toString()) {
        this.feedbackMessage = '正确!';
        this.pickRandomKey();
        if (this.currentKey === '') {
          // 停止计算时间，显示成绩。
          this.challengeStarted = false;
          this.elapsedTime = ((new Date().getTime() - this.startTime) / 1000).toFixed(2);
          Dialog.alert({
            title: '挑战成功',
            message: '挑战成功，您用时 ' + this.elapsedTime + ' 秒。',
          });
        }
      } else {
        this.feedbackMessage = '错误，请重新输入。';
      }
    },
    updateTimer() {
      if (this.challengeStarted) {
        this.elapsedTime = ((new Date().getTime() - this.startTime) / 1000).toFixed(2);
      }
    }
  },
  created() {
    setInterval(this.updateTimer, 100);
  },
  beforeDestroy() {
    window.removeEventListener('keypress', this.checkInput);
  }
}
</script>

<style>

#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}

.start-button {
  display: block;
  margin-top: 2%;
}

.click-button {
  margin-top: 2%;
  margin-left: 2%;
}

.time {
  margin-bottom: 2vh;
  font-size: large;
  color: #ff4d51;
}

.key {
  font-size: 50px;
  color: #67C23A;
}

</style>
