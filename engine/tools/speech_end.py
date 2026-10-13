import subprocess,re
def speech_end(f):
    e=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','silencedetect=n=-40dB:d=0.1','-f','null','-'],capture_output=True,text=True).stderr
    D=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
    ss=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',e)]; se=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',e)]
    if ss and (len(se)<len(ss) or se[-1]>=D-0.02): return ss[-1],D
    return D,D
