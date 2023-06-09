class Media {
  private audioEnabled: boolean;
  private videoEnabled: boolean;
  public stream: MediaStream | undefined;
  private facingMode: "environment" | "user";
  private constraints: MediaStreamConstraints;

  constructor(videoOn?: boolean) {
    this.audioEnabled = true;
    this.videoEnabled = videoOn ? videoOn : false;
    this.facingMode = "environment";
    this.constraints = {
      audio: this.audioEnabled,
      video: this.videoEnabled
        ? {
            facingMode: this.facingMode,
          }
        : false,
    };
  }

  isCameraOn() {
    return this.videoEnabled;
  }

  isMicOn() {
    return this.audioEnabled;
  }

  async cameraOn() {
    this.videoEnabled = true;
    await this.initializeStream();
  }

  async micOn() {
    this.audioEnabled = true;
    await this.initializeStream();
  }

  cameraOff() {
    this.videoEnabled = false;
    this.stream?.getVideoTracks().forEach((track) => {
      track.stop();
    });
  }

  micOff() {
    this.audioEnabled = false;
    this.stream?.getAudioTracks().forEach((track) => {
      track.stop();
    });
  }

  async toggleCamera() {
    this.videoEnabled = !this.videoEnabled;
    await this.initializeStream();
  }

  async toggleMicrophone() {
    this.audioEnabled = !this.audioEnabled;
    await this.initializeStream();
  }

  turnOffAll() {
    this.videoEnabled = false;
    this.audioEnabled = false;
    this.cameraOff();
    this.micOff();
  }

  private async initializeStream() {
    try {
      if (this.stream) {
        this.stream.getTracks().forEach((t) => t.stop());
      }
      this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
    } catch (e) {
      console.error(e);
    }
  }

  getStream(): MediaStream | undefined {
    return this.stream;
  }
}

export default Media;
