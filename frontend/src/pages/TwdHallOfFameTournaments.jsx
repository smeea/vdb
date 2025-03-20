import { Disclosure } from '@headlessui/react';
import { TwdHallFameTournamentsPlayer } from '@/components';
import { useFetch } from '@/hooks';
import { byName } from '@/utils';

const TwdHallOfFameTournaments = () => {
  const url = `${import.meta.env.VITE_API_URL}/twd/hall_of_fame`;
  const { value } = useFetch(url, {}, []);

  const byWins = (a, b) => {
    return Object.keys(value[b]).length - Object.keys(value[a]).length;
  };

  return (
    <div className="hof-tournaments-container mx-auto flex flex-col gap-1.5">
      {value && (
        Object.keys(value)
            .toSorted(byName)
            .toSorted(byWins)
            .map((player) => (
              <Disclosure key={player}>
                <TwdHallFameTournamentsPlayer name={player} decks={value[player]} />
              </Disclosure>
            ))
      )}
    </div>
  );
};

export default TwdHallOfFameTournaments;
