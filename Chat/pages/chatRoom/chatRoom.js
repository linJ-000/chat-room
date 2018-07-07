// pages/chatRoom/chatRoom.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    socketOpen: false,
    inputValue: '',
    msgKey:0,
    items:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      wx.setNavigationBarTitle({
          title: '聊天室'
      })
      wx.connectSocket({
          url: 'ws://localhost:8080'
      })
      wx.onSocketOpen(function (res) {
          console.log('WebSocket连接已打开！')
          self.setData({ socketOpen : true })
          wx.sendSocketMessage({
              data: JSON.stringify({
                  state: 0,
                  msg: app.globalData.userInfo.nickName + "登录聊天室"
              })
          })
      })

      wx.onSocketMessage(function (res) {
          self.setData({msgKey : self.data.msgKey++})
          res = JSON.parse(res.data)
          var data = {
              nickName: res.nickName,
              avatarUrl: res.avatarUrl,
              text: res.text,
              time: res.time,
              key: self.data.msgKey,
              isSelf: false
          }
          var items = self.data.items
          items.push(data)
          self.setData({
              items: items
          })
          wx.pageScrollTo({
              scrollTop: 300,
              duration: 300,
          })
      })

      wx.onSocketClose(function (res) {
          console.log('WebSocket连接已关闭！')
          self.setData({ socketOpen: false })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getInput: function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  send: function(e){
    var self = this
    if(this.data.inputValue.trim() !== ''){
        if(this.data.socketOpen){
            wx.sendSocketMessage({
                data: JSON.stringify({
                    nickName: app.globalData.userInfo.nickName,
                    avatarUrl: app.globalData.userInfo.avatarUrl,
                    text: this.data.inputValue,
                    time: new Date()
                })
            })
        }
        this.setData({
            inputValue: ""
        })
    }
  }
})