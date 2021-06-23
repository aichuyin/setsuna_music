<template>
<transition appear>
  <div class="account">
      <AccountHeader @switchItem='switchItem'></AccountHeader>
      <AccountBottom :switchNum='switchNum'></AccountBottom>
  </div>
</transition>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader.vue'
import AccountBottom from '../components/Account/AccountBottom.vue'

export default {
  name: 'Account',
  components: {
    AccountHeader,
    AccountBottom
  },
  data () {
    return {
      switchNum: 0
    }
  },
  methods: {
    switchItem (num) {
      this.switchNum = num
    }
  }
}

</script>
<style scoped lang='scss'>
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';

.account {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // background: #f00;
    @include bg_sub_color();
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>
