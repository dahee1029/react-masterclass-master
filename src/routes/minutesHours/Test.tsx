import { useRecoilState } from 'recoil';
import { hourSelector, minuteState } from './atom';

const Test = () => {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        onChange={onMinutesChange}
        value={minutes}
        placeholder='Minutes'
        type='number'
      />
      <input
        onChange={onHoursChange}
        value={hours}
        placeholder='Hours'
        type='number'
      />
    </div>
  );
};

export default Test;
