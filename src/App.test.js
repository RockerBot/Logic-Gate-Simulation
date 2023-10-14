import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
function displayNumber() {
  const input = document.getElementById('numberInput').value;
  if (input.length === 1 && /^[0-9]$/.test(input)) {
      const segments = document.querySelectorAll('.segment');
      const digit = parseInt(input);

      // Define which segments should be active to display each digit
      const digitSegments = [
          ['a', 'b', 'c', 'd', 'e', 'f'],     // 0
          ['b', 'c'],                         // 1
          ['a', 'b', 'd', 'e', 'g'],         // 2
          ['a', 'b', 'c', 'd', 'g'],         // 3
          ['b', 'c', 'f', 'g'],             // 4
          ['a', 'c', 'd', 'f', 'g'],         // 5
          ['a', 'c', 'd', 'e', 'f', 'g'],     // 6
          ['a', 'b', 'c'],                 // 7
          ['a', 'b', 'c', 'd', 'e', 'f', 'g'], // 8
          ['a', 'b', 'c', 'd', 'f', 'g']     // 9
      ];

      // Reset all segments
      segments.forEach(segment => {
          segment.classList.remove('active');
      });

      // Activate segments based on the digit
      digitSegments[digit].forEach(segmentId => {
          document.querySelector(`.${segmentId}`).classList.add('active');
      })
  } else {
      alert('Please enter a single digit (0-9).');
  }
}

