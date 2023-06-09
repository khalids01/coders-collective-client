class PeerService {
  peer: RTCPeerConnection;
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  }

  getSignalingState() {
    return this.peer.signalingState;
  }

  async getAnswer(offer: RTCSessionDescription) {
    try {
      await this.peer.setRemoteDescription(offer);
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.log("Failed to create answer", error);
      throw error;
    }
  }

  async setLocalDescription(ans: RTCSessionDescription) {
    await this.peer.setLocalDescription(new RTCSessionDescription(ans));
  }

  async getOffer() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  }
}

export default PeerService;
