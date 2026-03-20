/**
 * Copyright (C) 2025 Uppli SAS — Billariz
 *
 * This file is part of Billariz, licensed under the GNU Affero General
 * Public License v3.0 (AGPL-3.0). You may use, modify and distribute
 * this software under the terms of the AGPL-3.0.
 *
 * For commercial use without AGPL obligations, contact:
 * contact@billariz.com | contact@uppli.fr
 * https://billariz.com
 */

// src/pages/auth/Callback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COGNITO_API } from 'src/config';

function Callback() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (!code) {
      const error = urlParams.get('error_description') || 'Erreur OAuth';
      console.error('Aucun code de redirection OAuth trouvé, erreur :',error );
      navigate('/auth/login', {
                state: {
                  authError: 'IdP error :'+error,
                },
              });
      return;
    }

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: COGNITO_API.clientId,
      code,
      redirect_uri: COGNITO_API.redirectUri,
    });
    const domain = `https://${COGNITO_API.domain}.auth.${COGNITO_API.region}.amazoncognito.com`;
    const url = `${domain}/oauth2/token`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ Token reçu depuis Cognito', data);

        // Exemple de stockage en localStorage
        localStorage.setItem('id_token', data.id_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Redirige vers tableau de bord
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération du token:', err);
        navigate('/auth/login', {
                state: {
                  authError: 'Tocken retriving error :'+err,
                },
              });
      });
  }, [navigate]);

  // return <p>Connexion en cours...</p>;
}

export default Callback;