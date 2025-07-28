'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  opacity: number;
  baseOpacity: number;
  targetOpacity?: number;
  trail: Array<{ x: number; y: number }>;
  flockId: number;
}

interface FlockConfig {
  size: number;
  spread: number;
  multiColor: boolean;
  density:
    | 'tight'
    | 'medium'
    | 'loose'
    | 'scattered'
    | 'sparse'
    | 'ultra-sparse';
  shape: 'circle' | 'triangle' | 'diamond' | 'star' | 'heart';
  yPosition?: number;
  xPosition?: number;
  fullWidth?: boolean;
}

export const FlowingParticles = ({
  className = '',
  opacity = 0.6,
}: {
  className?: string;
  opacity?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let flocks: FlockConfig[] = [];
    let isFormingText = false;
    let textFormationProgress = 0;
    let lastTextFormationTime = Date.now();
    let letterFormationDelays: number[] = [];

    // Brand color palette
    const colors = [
      '#00e0ff', // Cyan
      '#ff4ecd', // Pink
      '#ffb500', // Amber
      '#4a9eff', // Blue
    ];

    // Store random positions and properties for letters
    let letterPositions: Array<{
      x: number;
      y: number;
      angle: number;
      vx: number;
      vy: number;
      rotationSpeed: number;
    }> = [];

    // Find areas with highest particle density
    function findDensestAreas(
      numAreas: number
    ): Array<{ x: number; y: number; density: number }> {
      const gridSize = 200; // Size of each grid cell
      const densityMap = new Map<string, number>();

      // Count particles in each grid cell
      particles.forEach(particle => {
        const gridX = Math.floor(particle.x / gridSize);
        const gridY = Math.floor(particle.y / gridSize);
        const key = `${gridX},${gridY}`;
        densityMap.set(key, (densityMap.get(key) || 0) + 1);
      });

      // Convert to array and sort by density
      const areas = Array.from(densityMap.entries())
        .map(([key, density]) => {
          const [gridX, gridY] = key.split(',').map(Number);
          return {
            x: gridX * gridSize + gridSize / 2,
            y: gridY * gridSize + gridSize / 2,
            density,
          };
        })
        .filter(area => area.y > window.innerHeight) // Only below fold
        .sort((a, b) => b.density - a.density);

      return areas.slice(0, numAreas * 3); // Get top dense areas with extras for spacing
    }

    // Generate positions based on particle density
    function generateLetterPositions() {
      letterPositions = [];
      const text = 'JustEvery_';
      const baseHeight = 100; // Base height for capital letters
      const minSpacing = 500; // Much larger spacing to prevent any overlap

      // Get letter sizes based on case
      const letterSizes: Record<string, { width: number; height: number }> = {
        J: { width: 80, height: baseHeight },
        u: { width: 80, height: baseHeight * 0.65 },
        s: { width: 80, height: baseHeight * 0.65 },
        t: { width: 80, height: baseHeight * 0.8 },
        E: { width: 80, height: baseHeight },
        v: { width: 80, height: baseHeight * 0.65 },
        e: { width: 80, height: baseHeight * 0.65 },
        r: { width: 80, height: baseHeight * 0.65 },
        y: { width: 80, height: baseHeight * 0.65 },
        _: { width: 80, height: baseHeight * 0.2 },
      };

      // Find dense areas
      const denseAreas = findDensestAreas(text.length);
      const usedAreas = new Set<number>(); // Track which areas we've used

      for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const size = letterSizes[letter] || { width: 80, height: baseHeight };
        let position = null;
        let attempts = 0;
        const maxAttempts = 50; // More attempts before giving up

        // Try to find a position in a dense area that doesn't overlap
        while (!position && attempts < maxAttempts) {
          // Try different dense areas, cycling through them
          const availableAreas = denseAreas.filter(
            (_, idx) => !usedAreas.has(idx)
          );
          const areaToTry =
            availableAreas.length > 0
              ? availableAreas[attempts % availableAreas.length]
              : denseAreas[attempts % denseAreas.length];

          let candidatePosition;

          if (!areaToTry || attempts > 20) {
            // After many attempts, try completely random positions
            candidatePosition = {
              x: 100 + Math.random() * (window.innerWidth - 200),
              y: window.innerHeight + 100 + Math.random() * 2000, // Larger Y range
            };
          } else {
            // Position near dense area with increasing randomness on each attempt
            const randomRange = 200 + attempts * 20; // Increase spread with attempts
            candidatePosition = {
              x:
                areaToTry.x -
                size.width / 2 +
                (Math.random() - 0.5) * randomRange,
              y:
                areaToTry.y -
                size.height / 2 +
                (Math.random() - 0.5) * randomRange,
            };
          }

          // Ensure within screen bounds
          candidatePosition.x = Math.max(
            100,
            Math.min(window.innerWidth - size.width - 100, candidatePosition.x)
          );
          candidatePosition.y = Math.max(
            window.innerHeight + 50,
            candidatePosition.y
          );

          // Check distance from ALL other letters
          let tooClose = false;
          for (let j = 0; j < letterPositions.length; j++) {
            const dx = candidatePosition.x - letterPositions[j].x;
            const dy = candidatePosition.y - letterPositions[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minSpacing) {
              tooClose = true;
              break;
            }
          }

          if (!tooClose) {
            position = candidatePosition;
            // Mark this area as used if we placed a letter near it
            const areaIndex = denseAreas.indexOf(areaToTry);
            if (areaIndex !== -1) {
              usedAreas.add(areaIndex);
            }
          }

          attempts++;
        }

        // If we still couldn't find a position, force one with proper spacing
        if (!position) {
          // Place in a grid pattern as fallback
          const cols = Math.floor(window.innerWidth / minSpacing);
          const row = Math.floor(i / cols);
          const col = i % cols;
          position = {
            x: 100 + col * minSpacing,
            y: window.innerHeight + 100 + row * minSpacing,
          };
        }

        // Add random angle and gentle single-direction drift
        const driftAngle = Math.random() * Math.PI * 2; // Random direction
        const driftSpeed = 0.3; // Doubled drift speed from 0.15
        const letterData = {
          ...position,
          angle: ((Math.random() - 0.5) * 30 * Math.PI) / 180, // ±15 degrees in radians (reduced)
          vx: Math.cos(driftAngle) * driftSpeed, // Single direction drift
          vy: Math.sin(driftAngle) * driftSpeed, // Single direction drift
          rotationSpeed: 0, // No rotation once formed
        };

        letterPositions.push(letterData);
      }

      // Generate random delays for staggered appearance
      letterFormationDelays = text.split('').map(() => Math.random() * 0.3);
    }

    // Simple text points for "JustEvery_" - distributed at dense particle areas
    function getTextPoints(): Array<{ x: number; y: number }> {
      const points: Array<{ x: number; y: number }> = [];
      const text = 'JustEvery_';
      const baseWidth = 80;
      const baseHeight = 100;

      // Get letter sizes based on case
      const letterSizes: Record<string, { width: number; height: number }> = {
        J: { width: baseWidth, height: baseHeight },
        u: { width: baseWidth, height: baseHeight * 0.65 },
        s: { width: baseWidth, height: baseHeight * 0.65 },
        t: { width: baseWidth, height: baseHeight * 0.8 },
        E: { width: baseWidth, height: baseHeight },
        v: { width: baseWidth, height: baseHeight * 0.65 },
        e: { width: baseWidth, height: baseHeight * 0.65 },
        r: { width: baseWidth, height: baseHeight * 0.65 },
        y: { width: baseWidth, height: baseHeight * 0.65 },
        _: { width: baseWidth, height: baseHeight * 0.2 },
      };

      // Simple bitmap font - each letter is a 5x7 grid with proper case
      const letters: Record<string, string[]> = {
        J: ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
        u: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
        s: ['.###.', '#...#', '#....', '.###.', '....#', '#...#', '.###.'],
        t: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
        E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
        v: ['#...#', '#...#', '#...#', '.#.#.', '.#.#.', '..#..', '..#..'],
        e: ['.###.', '#...#', '#...#', '#####', '#....', '#...#', '.###.'],
        r: ['#....', '#....', '#.##.', '##..#', '#....', '#....', '#....'],
        y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '.#...'],
        _: ['#####', '.....', '.....', '.....', '.....', '.....', '.....'],
      };

      // Convert text to points using density-based positions
      for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const letterData = letters[letter];
        if (!letterData) continue;

        const position = letterPositions[i];
        if (!position) continue;

        const size = letterSizes[letter] || {
          width: baseWidth,
          height: baseHeight,
        };

        // Update position based on gentle drift (only after mostly formed)
        if (isFormingText && textFormationProgress > 0.9) {
          position.x += position.vx;
          position.y += position.vy;
          // No rotation update - keep initial angle

          // Gentle wrap around instead of bounce
          if (position.x < -100) {
            position.x = window.innerWidth + 100;
          } else if (position.x > window.innerWidth + 100) {
            position.x = -100;
          }

          // Get page height estimate
          const pageHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          );
          if (position.y < window.innerHeight - 100) {
            position.y = pageHeight + 100;
          } else if (position.y > pageHeight + 100) {
            position.y = window.innerHeight - 100;
          }
        }

        // Adjust Y position for lowercase letters to align baselines
        let yOffset = 0;
        if (letter === letter.toLowerCase() && letter !== '_') {
          yOffset = baseHeight * 0.35; // Lower lowercase letters to baseline
        }
        if (letter === '_') {
          yOffset = baseHeight * 0.8; // Position underscore at baseline
        }

        // Apply rotation to letter points
        const centerX = size.width / 2;
        const centerY = size.height / 2;

        for (let row = 0; row < letterData.length; row++) {
          for (let col = 0; col < letterData[row].length; col++) {
            if (letterData[row][col] === '#') {
              // Calculate point relative to letter center
              const relX = col * (size.width / 5) - centerX;
              const relY = row * (size.height / 7) - centerY;

              // Apply rotation
              const cos = Math.cos(position.angle);
              const sin = Math.sin(position.angle);
              const rotatedX = relX * cos - relY * sin;
              const rotatedY = relX * sin + relY * cos;

              points.push({
                x: position.x + rotatedX + centerX,
                y: position.y + yOffset + rotatedY + centerY,
              });
            }
          }
        }
      }

      return points;
    }

    const generateFlocks = () => {
      flocks = [];

      // Get viewport height to know where "below the fold" starts
      const viewportHeight = window.innerHeight;
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      // Calculate number of flocks based on page height
      // More flocks as we go down the page
      const viewportArea = window.innerWidth * window.innerHeight;
      const baseFlockCount = 4;
      const additionalFlocks = Math.floor(viewportArea / 600000); // More flocks for letter opportunities
      const totalFlocks = baseFlockCount + additionalFlocks;

      const shapes: FlockConfig['shape'][] = [
        'circle',
        'triangle',
        'diamond',
        'star',
        'heart',
      ];
      const densities: FlockConfig['density'][] = [
        'tight',
        'medium',
        'loose',
        'scattered',
        'sparse',
        'ultra-sparse',
      ];

      // Generate flocks with increasing density as we go down
      for (let i = 0; i < totalFlocks; i++) {
        // Position flocks only below the fold and increasingly dense lower on page
        const minY = viewportHeight + 100; // Start 100px below viewport to ensure nothing above fold
        const maxY = pageHeight - 200;

        // Calculate Y position with bias toward bottom
        const t = Math.random();
        const yBias = Math.pow(t, 0.7); // Bias toward bottom (0.7 makes it more bottom-heavy)
        const yPosition = minY + (maxY - minY) * yBias;

        // Less tight clusters, more variety
        const isTightCluster = Math.random() > 0.85; // Only 15% tight clusters (was implicit ~40%)
        const isLargeFlock = Math.random() > 0.7;
        const isSparse = Math.random() > 0.4; // More sparse flocks

        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        flocks.push({
          size: isLargeFlock
            ? Math.floor(60 + Math.random() * 80) // 60-140 particles
            : Math.floor(15 + Math.random() * 40), // 15-55 particles
          spread: isSparse
            ? 400 + Math.random() * 800 // 400-1200 spread for sparse
            : 150 + Math.random() * 350, // 150-500 for normal
          multiColor: Math.random() > 0.3, // 70% multicolor
          density: isTightCluster
            ? 'tight'
            : densities[Math.floor(Math.random() * (densities.length - 1)) + 1],
          shape: shape,
          yPosition: yPosition, // Store Y position for this flock
        });
      }

      // Add extra sparse flocks covering full width
      const sparseFlockCount = Math.floor(pageHeight / 1000); // One sparse flock per 1000px of height
      for (let i = 0; i < sparseFlockCount; i++) {
        const yPosition =
          viewportHeight +
          100 +
          (pageHeight - viewportHeight - 100) * (i / sparseFlockCount) +
          Math.random() * 500;

        flocks.push({
          size: Math.floor(30 + Math.random() * 50), // 30-80 particles
          spread: 800 + Math.random() * 1200, // Very wide spread
          multiColor: Math.random() > 0.2,
          density: 'ultra-sparse',
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          yPosition: yPosition,
          fullWidth: true, // Mark as full-width flock
        });
      }
    };

    const resize = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      canvas.width = window.innerWidth;
      canvas.height = docHeight;

      generateFlocks();
      initParticles();
    };

    const initParticles = () => {
      particles.length = 0;
      const viewportHeight = window.innerHeight;

      // Create flocks spread across the page
      flocks.forEach((flock, flockId) => {
        // Use stored positions if available, otherwise random
        const flockCenterX =
          flock.xPosition ||
          (flock.fullWidth
            ? Math.random() * canvas.width // Full width flocks can be anywhere horizontally
            : 200 + Math.random() * (canvas.width - 400)); // Regular flocks avoid edges
        const flockCenterY =
          flock.yPosition || 200 + Math.random() * (canvas.height - 400);
        const flockColor = colors[flockId % colors.length];

        // Random flock direction
        const flockAngle = Math.random() * Math.PI * 2;
        const flockSpeed = 1.2 + Math.random() * 0.8; // Increased from 0.6-1.0 to 1.2-2.0

        for (let i = 0; i < flock.size; i++) {
          let x, y;
          const t = i / flock.size; // Progress through shape

          // Create different shapes based on flock configuration
          switch (flock.shape) {
            case 'star': {
              const angle = t * Math.PI * 10; // 5-pointed star
              const radius =
                (i % 2 === 0 ? flock.spread : flock.spread * 0.5) *
                (0.5 + Math.random() * 0.5);
              x = flockCenterX + Math.cos(angle) * radius;
              y = flockCenterY + Math.sin(angle) * radius;
              break;
            }
            case 'diamond': {
              const angle = t * Math.PI * 2;
              const diamondRadius = flock.spread * (0.5 + Math.random() * 0.5);
              const diamondX = Math.cos(angle) * diamondRadius;
              const diamondY = Math.sin(angle) * diamondRadius;
              // Rotate 45 degrees and stretch
              x = flockCenterX + (diamondX - diamondY) * 0.7;
              y = flockCenterY + (diamondX + diamondY) * 0.5;
              break;
            }
            case 'triangle': {
              const side = Math.floor(t * 3);
              const sideProgress = (t * 3) % 1;
              const spread = flock.spread * (0.7 + Math.random() * 0.3);
              if (side === 0) {
                x = flockCenterX + (sideProgress - 0.5) * spread;
                y = flockCenterY - spread * 0.5;
              } else if (side === 1) {
                x = flockCenterX + spread * 0.5 - sideProgress * spread;
                y = flockCenterY - spread * 0.5 + sideProgress * spread;
              } else {
                x = flockCenterX - spread * 0.5 + sideProgress * spread;
                y = flockCenterY + spread * 0.5 - sideProgress * spread * 0.5;
              }
              break;
            }
            case 'heart': {
              const angle = t * Math.PI * 2 - Math.PI / 2;
              const heartScale = flock.spread * 0.02;
              x = flockCenterX + heartScale * 16 * Math.pow(Math.sin(angle), 3);
              y =
                flockCenterY -
                heartScale *
                  (13 * Math.cos(angle) -
                    5 * Math.cos(2 * angle) -
                    2 * Math.cos(3 * angle) -
                    Math.cos(4 * angle));
              // Add some randomness
              x += (Math.random() - 0.5) * flock.spread * 0.2;
              y += (Math.random() - 0.5) * flock.spread * 0.2;
              break;
            }
            default: // circle - add more variety for tight clusters
              const angle = t * Math.PI * 2;
              const radius = flock.spread * (0.5 + Math.random() * 0.5);

              // For tight clusters, add variety with ellipses and irregular shapes
              if (flock.density === 'tight') {
                const ellipseRatio = 0.5 + Math.random() * 1.0; // Between 0.5 and 1.5
                const irregularity = Math.random() * 0.3; // Add some noise
                const angleVariation = Math.sin(angle * 3) * irregularity;

                x =
                  flockCenterX +
                  Math.cos(angle + angleVariation) * radius * ellipseRatio;
                y =
                  flockCenterY +
                  (Math.sin(angle + angleVariation) * radius) / ellipseRatio;

                // Rotate the ellipse randomly
                const rotation = Math.random() * Math.PI;
                const tempX = x - flockCenterX;
                const tempY = y - flockCenterY;
                x =
                  flockCenterX +
                  tempX * Math.cos(rotation) -
                  tempY * Math.sin(rotation);
                y =
                  flockCenterY +
                  tempX * Math.sin(rotation) +
                  tempY * Math.cos(rotation);
              } else {
                x = flockCenterX + Math.cos(angle) * radius;
                y = flockCenterY + Math.sin(angle) * radius;
              }
          }

          // Apply density variations - much more extreme for sparse flocks
          const densityFactor = {
            tight: 0.3,
            medium: 0.6,
            loose: 1.0,
            scattered: 1.5,
            sparse: 3.0,
            'ultra-sparse': 10.0,
          }[flock.density];

          x = flockCenterX + (x - flockCenterX) * densityFactor;
          y = flockCenterY + (y - flockCenterY) * densityFactor;

          // Add some randomness based on density
          const randomness = densityFactor * 30;
          x += (Math.random() - 0.5) * randomness;
          y += (Math.random() - 0.5) * randomness;

          // Determine particle color
          let particleColor;
          if (flock.multiColor) {
            particleColor = colors[Math.floor(Math.random() * colors.length)];
          } else {
            particleColor = flockColor;
          }

          const baseOpacity = Math.random() * 0.3 + 0.7;

          // Calculate initial opacity based on Y position
          let initialOpacity = 0;
          if (y > viewportHeight) {
            const pageHeight = Math.max(
              document.body.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.clientHeight,
              document.documentElement.scrollHeight,
              document.documentElement.offsetHeight
            );
            const depthRatio = Math.max(
              0,
              Math.min(1, (y - viewportHeight) / (pageHeight - viewportHeight))
            );
            initialOpacity = depthRatio * 0.9 * baseOpacity;
          }

          particles.push({
            x,
            y,
            vx: Math.cos(flockAngle) * flockSpeed + (Math.random() - 0.5) * 0.2,
            vy: Math.sin(flockAngle) * flockSpeed + (Math.random() - 0.5) * 0.2,
            color: particleColor,
            size: Math.random() * 1.2 + 0.8,
            opacity: initialOpacity,
            baseOpacity: baseOpacity,
            trail: [],
            flockId: flockId,
          });
        }
      });
    };

    // Store particle assignments globally for opacity updates
    let globalParticleAssignments = new Map();

    const updateParticles = () => {
      // Get text points if forming text
      const textPoints = textFormationProgress > 0 ? getTextPoints() : [];

      // Assign closest particles to each text point
      const assignedParticles = new Set();
      const particleAssignments = new Map();

      if (textFormationProgress > 0 && textPoints.length > 0) {
        // For each text point, find the closest unassigned particle
        textPoints.forEach(point => {
          let closestParticle = null;
          let closestDistance = Infinity;

          particles.forEach((particle, idx) => {
            if (!assignedParticles.has(idx)) {
              const dx = particle.x - point.x;
              const dy = particle.y - point.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < closestDistance) {
                closestDistance = distance;
                closestParticle = idx;
              }
            }
          });

          if (closestParticle !== null) {
            assignedParticles.add(closestParticle);
            particleAssignments.set(closestParticle, point);
          }
        });
      }

      // Update global assignments
      globalParticleAssignments = particleAssignments;

      particles.forEach((particle, index) => {
        // Text formation attraction
        if (textFormationProgress > 0 && particleAssignments.has(index)) {
          const targetPoint = particleAssignments.get(index);
          const dx = targetPoint.x - particle.x;
          const dy = targetPoint.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Stronger attraction that increases with progress
          const attractionStrength = textFormationProgress * 0.3; // Increased from 0.1

          particle.vx += dx * attractionStrength;
          particle.vy += dy * attractionStrength;

          // Less damping for faster movement
          particle.vx *= 1 - textFormationProgress * 0.1; // Reduced from 0.3
          particle.vy *= 1 - textFormationProgress * 0.1;

          // Extra boost if far away
          if (distance > 200) {
            const boostStrength = 0.2;
            particle.vx += ((dx / distance) * boostStrength * distance) / 100;
            particle.vy += ((dy / distance) * boostStrength * distance) / 100;
          }

          // When very close, add subtle movement instead of snapping
          if (distance < 5 && textFormationProgress > 0.8) {
            // Add small random movement - like struggling to hold position
            const jitter = 0.2; // Reduced jitter for tighter formation
            particle.vx += (Math.random() - 0.5) * jitter;
            particle.vy += (Math.random() - 0.5) * jitter;

            // Add gentle orbital movement
            const angle = Date.now() * 0.001 + index * 0.1;
            particle.vx += Math.cos(angle) * 0.05; // Reduced from 0.1
            particle.vy += Math.sin(angle) * 0.05;

            // Strong pull toward center to maintain shape
            particle.vx += (targetPoint.x - particle.x) * 0.3; // Increased from 0.15
            particle.vy += (targetPoint.y - particle.y) * 0.3;

            // Increase damping but not completely
            particle.vx *= 0.85; // Increased damping
            particle.vy *= 0.85;
          }

          // When fully formed and drifting, maintain very strong attraction
          if (textFormationProgress > 0.9 && distance > 2) {
            // Extra strong pull to maintain letter shape during drift
            particle.vx += (targetPoint.x - particle.x) * 0.5;
            particle.vy += (targetPoint.y - particle.y) * 0.5;
            particle.vx *= 0.9;
            particle.vy *= 0.9;
          }
        }

        // Get other particles in the same flock
        const flockmates = particles.filter(
          p => p.flockId === particle.flockId && p !== particle
        );
        const flock = flocks[particle.flockId];

        if (!flock) return; // Safety check

        // Flocking forces - reduce when forming text
        const flockingReduction = particleAssignments.has(index)
          ? 1 - textFormationProgress * 0.95 // Almost completely disable flocking for text particles
          : 1 - textFormationProgress * 0.3; // Slight reduction for other particles
        let separationX = 0,
          separationY = 0;
        let alignmentX = 0,
          alignmentY = 0;
        let cohesionX = 0,
          cohesionY = 0;

        let neighborCount = 0;

        flockmates.forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Adjust influence radius based on flock density
          const influenceMultiplier = {
            tight: 0.7,
            medium: 1.0,
            loose: 1.3,
            scattered: 1.8,
            sparse: 3.0,
            'ultra-sparse': 5.0,
          }[flock.density];

          const influenceRadius = 120 * influenceMultiplier;
          const separationRadius = 40 * influenceMultiplier;

          if (distance > 0 && distance < influenceRadius) {
            neighborCount++;

            // Separation - avoid crowding
            if (distance < separationRadius) {
              const force = (separationRadius - distance) / separationRadius;
              separationX += (dx / distance) * force;
              separationY += (dy / distance) * force;
            }

            // Alignment - match velocity
            alignmentX += other.vx;
            alignmentY += other.vy;

            // Cohesion - move toward center
            cohesionX += other.x;
            cohesionY += other.y;
          }
        });

        if (neighborCount > 0) {
          // Average alignment
          alignmentX /= neighborCount;
          alignmentY /= neighborCount;

          // Average cohesion
          cohesionX /= neighborCount;
          cohesionY /= neighborCount;

          // Apply cohesion force toward center - adjusted by density
          const cohesionStrength = {
            tight: 0.02,
            medium: 0.015,
            loose: 0.01,
            scattered: 0.005,
            sparse: 0.002,
            'ultra-sparse': 0.0005,
          }[flock.density];

          cohesionX = (cohesionX - particle.x) * cohesionStrength;
          cohesionY = (cohesionY - particle.y) * cohesionStrength;

          // Apply alignment force - also adjusted by density
          const alignmentStrength = {
            tight: 0.05,
            medium: 0.03,
            loose: 0.02,
            scattered: 0.01,
            sparse: 0.005,
            'ultra-sparse': 0.002,
          }[flock.density];

          alignmentX = (alignmentX - particle.vx) * alignmentStrength;
          alignmentY = (alignmentY - particle.vy) * alignmentStrength;
        }

        // Apply forces - separation force also adjusted by density
        const separationStrength = {
          tight: 0.2,
          medium: 0.15,
          loose: 0.1,
          scattered: 0.08,
          sparse: 0.05,
          'ultra-sparse': 0.03,
        }[flock.density];

        particle.vx +=
          (separationX * separationStrength + alignmentX + cohesionX) *
          flockingReduction;
        particle.vy +=
          (separationY * separationStrength + alignmentY + cohesionY) *
          flockingReduction;

        // Mouse avoidance
        const mouseDx = particle.x - mouseX;
        const mouseDy = particle.y - mouseY;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseDistance < 150 && mouseDistance > 0) {
          const mouseForce = ((150 - mouseDistance) / 150) * 1.5;
          particle.vx += (mouseDx / mouseDistance) * mouseForce;
          particle.vy += (mouseDy / mouseDistance) * mouseForce;
        }

        // Gentle content avoidance - allow particles to pass through outer 20%
        const contentElements = document.querySelectorAll('h1, h2, p, button');
        contentElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + window.scrollY + rect.height / 2;

          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Reduce avoidance radius to 80% of the content size (allow 20% overlap)
          const contentRadius = Math.max(rect.width, rect.height) / 2;
          const avoidRadius = contentRadius * 0.8; // Only avoid inner 80%

          if (distance < avoidRadius && distance > 0) {
            // Reduce force strength for gentler avoidance
            const force = ((avoidRadius - distance) / avoidRadius) * 0.3; // Reduced from 0.5 to 0.3
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        });

        // Limit speed for smooth movement
        const maxSpeed = 3.0; // Increased from 1.8 to 3.0
        const currentSpeed = Math.sqrt(
          particle.vx * particle.vx + particle.vy * particle.vy
        );
        if (currentSpeed > maxSpeed) {
          particle.vx = (particle.vx / currentSpeed) * maxSpeed;
          particle.vy = (particle.vy / currentSpeed) * maxSpeed;
        }

        // Minimum speed to keep moving
        if (currentSpeed < 0.5) {
          // Increased from 0.3 to 0.5
          const angle = Math.random() * Math.PI * 2;
          particle.vx += Math.cos(angle) * 0.4; // Increased from 0.2 to 0.4
          particle.vy += Math.sin(angle) * 0.4;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update opacity based on Y position - from 0 at fold to 0.9 at bottom
        const viewportHeight = window.innerHeight;

        // Check if particle is assigned for text formation
        let particleFormationOpacity = 0;
        if (textFormationProgress > 0 && globalParticleAssignments.has(index)) {
          const targetPoint = globalParticleAssignments.get(index);
          const dx = targetPoint.x - particle.x;
          const dy = targetPoint.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Find which letter this particle belongs to
          let letterIndex = 0;
          const textPoints = getTextPoints();
          for (let i = 0; i < textPoints.length; i++) {
            if (
              textPoints[i].x === targetPoint.x &&
              textPoints[i].y === targetPoint.y
            ) {
              // Determine which letter based on x position
              for (let j = 0; j < letterPositions.length; j++) {
                if (Math.abs(textPoints[i].x - letterPositions[j].x) < 100) {
                  letterIndex = j;
                  break;
                }
              }
              break;
            }
          }

          // Apply staggered delay based on letter
          const letterDelay = letterFormationDelays[letterIndex] || 0;
          const adjustedProgress = Math.max(
            0,
            textFormationProgress - letterDelay
          );

          // Calculate opacity that increases during movement, not just when close
          if (adjustedProgress > 0) {
            // Base opacity from progress - start brighter
            let baseFormationOpacity = adjustedProgress * 0.9;

            // Strong proximity bonus for full brightness when close
            if (distance < 200) {
              // Start bonus opacity from further away
              const proximityBonus = 1 - distance / 200;
              baseFormationOpacity = Math.min(
                0.9,
                baseFormationOpacity * 0.7 + proximityBonus * 0.9
              );
            }

            particleFormationOpacity = baseFormationOpacity;
          }
        }

        // If particle is forming text and very close, ensure full brightness
        if (
          textFormationProgress > 0.9 &&
          globalParticleAssignments.has(index)
        ) {
          const targetPoint = globalParticleAssignments.get(index);
          const dx = targetPoint.x - particle.x;
          const dy = targetPoint.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 10) {
            particleFormationOpacity = 0.9; // Full brightness when in position
          }
        }

        // Smooth opacity transitions
        if (!particle.targetOpacity) particle.targetOpacity = 0;

        if (particleFormationOpacity > 0) {
          // Use formation opacity when forming text
          particle.targetOpacity = particleFormationOpacity;
        } else if (particle.y > viewportHeight) {
          // Below the fold - calculate depth-based opacity
          const pageHeight = canvas.height;
          const depthRatio = Math.max(
            0,
            Math.min(
              1,
              (particle.y - viewportHeight) / (pageHeight - viewportHeight)
            )
          );
          // Opacity goes from 0 to 0.9 based on depth
          particle.targetOpacity = depthRatio * 0.9;
        } else {
          // Above the fold - should be rare, but set to 0
          particle.targetOpacity = 0;
        }

        // Smooth opacity transition - even slower for smoother effect
        const opacitySpeed = 0.02; // Very slow transition
        particle.opacity +=
          (particle.targetOpacity - particle.opacity) * opacitySpeed;

        // Store trail BEFORE wrapping to avoid lines across screen
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 10) {
          particle.trail.shift();
        }

        // Wrap around edges - clear trail when wrapping to prevent lines
        let wrapped = false;

        if (particle.x < -50) {
          particle.x = canvas.width + 50;
          wrapped = true;
        }
        if (particle.x > canvas.width + 50) {
          particle.x = -50;
          wrapped = true;
        }
        // For Y-axis: only wrap when not forming text
        if (textFormationProgress < 0.5) {
          if (particle.y < viewportHeight) {
            // If particle goes above the fold, wrap it to bottom
            particle.y = canvas.height - 50;
            wrapped = true;
            // Maintain current opacity when wrapping from top to bottom
            particle.targetOpacity = particle.opacity;
          }
          if (particle.y > canvas.height + 50) {
            // Wrap from bottom to just below fold
            particle.y = viewportHeight + 100;
            wrapped = true;
            // Set target opacity to 0 when wrapping to top (just below fold)
            particle.targetOpacity = 0;
          }
        }

        // Clear trail when wrapping to prevent lines across screen
        if (wrapped) {
          particle.trail = [{ x: particle.x, y: particle.y }];
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trails
      particles.forEach(particle => {
        if (particle.trail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);

          // Only draw lines between consecutive points that aren't too far apart
          for (let i = 1; i < particle.trail.length; i++) {
            const dx = particle.trail[i].x - particle.trail[i - 1].x;
            const dy = particle.trail[i].y - particle.trail[i - 1].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If points are too far apart (wrapped), start new path
            if (distance > 100) {
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(particle.trail[i].x, particle.trail[i].y);
            } else {
              ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
            }
          }

          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.5;
          ctx.lineCap = 'round';
          ctx.globalAlpha = particle.opacity * opacity * 0.2; // Use particle's opacity
          ctx.stroke();
        }
      });

      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity * opacity;
        ctx.fill();

        // Subtle glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = particle.opacity * opacity * 0.1; // Use particle's opacity
        ctx.fillRect(
          particle.x - particle.size * 2,
          particle.y - particle.size * 2,
          particle.size * 4,
          particle.size * 4
        );
      });

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      const now = Date.now();

      // Toggle text formation every 20 seconds (but not when at top of page)
      if (now - lastTextFormationTime > 20000) {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Only form text if we're scrolled down past the fold
        if (scrollY > viewportHeight * 0.5) {
          isFormingText = !isFormingText;
          textFormationProgress = 0;
          lastTextFormationTime = now;

          // Generate new random positions when starting text formation
          if (isFormingText) {
            generateLetterPositions();
          }
        } else {
          // Reset if we were forming but scrolled to top
          if (isFormingText) {
            isFormingText = false;
            textFormationProgress = 0;
          }
          lastTextFormationTime = now;
        }
      }

      // Update text formation progress
      if (isFormingText && textFormationProgress < 1) {
        textFormationProgress += 0.008; // Even slower progress for smoother transitions
      } else if (!isFormingText && textFormationProgress > 0) {
        textFormationProgress -= 0.015; // Slower fade out too
      }

      updateParticles();
      drawParticles();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    generateLetterPositions(); // Initialize letter positions
    animate();

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute top-0 left-0 w-full ${className}`}
      style={{
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
};
